import { supabase } from './supabase';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system';

/**
 * Upload a meal image to Supabase Storage.
 * @param userId - The user's UUID
 * @param imageUri - Local file URI from the image picker
 * @returns The public URL of the uploaded image
 */
export const uploadMealImage = async (userId: string, imageUri: string): Promise<string> => {
  const timestamp = Date.now();
  const fileExt = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
  const filePath = `${userId}/${timestamp}.${fileExt}`;

  // Read the file as base64
  const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  // Upload to Supabase Storage
  const { error } = await supabase.storage
    .from('meal-images')
    .upload(filePath, decode(base64), {
      contentType: `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`,
      upsert: false,
    });

  if (error) throw error;

  // Get the public URL
  const { data } = supabase.storage
    .from('meal-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};
