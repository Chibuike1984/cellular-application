import localFont from 'next/font/local';

export const poppins = localFont({
  src: [
    {
      path: 'fonts/poppins/Poppins-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-ThinItalic.ttf',
      weight: '100',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-ExtraBoldItalic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: 'fonts/poppins/Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: 'fonts/poppins/Poppins-BlackItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'Arial', 'sans-serif'],
  
});
