import { ref } from "vue";
import imageCompression from "browser-image-compression";
import { supabase } from "../supabaseClient";

export function useImageUpload() {
  const isUploading = ref(false);
  const uploadError = ref<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    isUploading.value = true;
    uploadError.value = null;

    try {
      const options = {
        maxSizeMB: 0.2, // 200KB
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      const { error: uploadErr } = await supabase.storage
        .from("foto_produk")
        .upload(filePath, compressedFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadErr) {
        throw uploadErr;
      }

      const { data } = supabase.storage
        .from("foto_produk")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      uploadError.value = error.message;
      return null;
    } finally {
      isUploading.value = false;
    }
  };

  return {
    isUploading,
    uploadError,
    uploadImage,
  };
}
