// ----------------------------------------------------------------------
// دوال المساعدة: مطلوبة لعملية الحذف الآمن من Cloudinary
// ----------------------------------------------------------------------

function extractPublicId(url) {
    if (!url || url.includes('default-avatar')) return null; 
    const uploadIndex = url.indexOf('/upload/');
    if (uploadIndex === -1) return null;

    let path = url.substring(uploadIndex + '/upload/'.length);

    const versionMatch = path.match(/^v\d+\//);
    if (versionMatch) {
        path = path.substring(versionMatch[0].length);
    }

    const dotIndex = path.lastIndexOf('.');
    if (dotIndex !== -1) {
        path = path.substring(0, dotIndex);
    }
    
    return path;
}

async function signAPIRequest(params, apiSecret) {
    const sortedKeys = Object.keys(params).sort();
    const queryString = sortedKeys
        .map(key => `${key}=${params[key]}`)
        .join('&');
    
    const signatureBase = queryString + apiSecret;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureBase);
    
    const hash = await crypto.subtle.digest('SHA-1', data);
    
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// ----------------------------------------------------------------------
// نقطة النهاية الرئيسية: /update-profile-image
// ----------------------------------------------------------------------
export async function onRequestPost(context) {
  const { env, request } = context;
  const db = env.DB;
  // يجب أن يكون هذا الاسم مطابقاً لاسمك في Cloudinary
  const CLOUDINARY_CLOUD_NAME = "dhbanzq4n"; 

  try {
    const data = await request.json();
    
    // استقبال البيانات من الواجهة الأمامية
    const { email, image_url, old_image_url } = data; 
    
    // 🔍 التشخيص (أ): ما هو الرابط القديم الذي وصل؟
    console.log("Old Image URL Received:", old_image_url);
    
    if (!email || !image_url) {
      return new Response(JSON.stringify({ error: "بيانات ناقصة" }), { status: 400 });
    }

    // ------------------------------------------------
    // 1. تنفيذ عملية الحذف من Cloudinary
    // ------------------------------------------------
    const publicIdToDelete = extractPublicId(old_image_url);
    
    // 🔍 التشخيص (ب): ما هو المعرّف العام الذي تم استخلاصه؟
    console.log("Extracted Public ID:", publicIdToDelete);

    if (publicIdToDelete) {
      
      const timestamp = Math.floor(Date.now() / 1000);
      const paramsToSign = {
        public_id: publicIdToDelete,
        timestamp: timestamp,
      };

      const signature = await signAPIRequest(paramsToSign, env.CLOUDINARY_API_SECRET);
      
      const deleteFormData = new FormData();
      deleteFormData.append('public_id', publicIdToDelete);
      deleteFormData.append('api_key', env.CLOUDINARY_API_KEY);
      deleteFormData.append('timestamp', timestamp);
      deleteFormData.append('signature', signature);

      const deleteResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
        {
          method: 'POST',
          body: deleteFormData,
        }
      );
      
      const deleteData = await deleteResponse.json();
      
      // 🔍 التشخيص (ج): ما هي استجابة Cloudinary الرسمية؟
      console.log("Cloudinary Deletion Response:", deleteData); 

      if (deleteData.result !== 'deleted' && deleteData.result !== 'not found') {
           console.error("Cloudinary Deletion Failed for:", publicIdToDelete, deleteData);
      } else {
           console.log("Cloudinary Deletion Success for:", publicIdToDelete);
      }
    }
    // ------------------------------------------------

    // 2. تحديث الرابط الجديد في قاعدة البيانات (D1)
    const ps = db.prepare(
      "UPDATE users SET profile_image_url = ? WHERE email = ?"
    );
    
    await ps.bind(image_url, email).run();

    return new Response(JSON.stringify({ 
        success: true, 
        message: "تم تحديث الصورة وحذف القديمة!", 
        newUrl: image_url 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Critical API Error:", e.message);
    return new Response(JSON.stringify({ error: `خطأ داخلي: ${e.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
