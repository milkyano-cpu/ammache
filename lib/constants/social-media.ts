export interface SocialMediaImage {
  name: string;
  image: string;
}

export const socialMediaImages: SocialMediaImage[] = Array.from({ length: 8 }, (_, i) => ({
  name: `Social ${i + 1}`,
  image: `/social${i + 1}.png`,
}))
