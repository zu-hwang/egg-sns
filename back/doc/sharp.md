```js
const sharp = require('sharp');
let imagePath = 'sharp.jpg';
sharp(imagePath).resize({ width: 400 }).toFile('sharp_resize1.jpg');
//비율을 유지하며 리사이즈 한다. left top을 기준으로 비율에 맞지 않는 부분은 잘라낸다.
sharp(imagePath)
  .resize({ width: 400, height: 1000, position: 'left top' })
  .toFile('sharp_resize2.jpg');
//원본 비율을 무시하고 리사이즈 한다.
sharp(imagePath)
  .resize({ fit: 'fill', width: 400, height: 600 })
  .toFile('sharp_resize3.jpg');
//이미지의 외곽을 확장한다.
sharp(imagePath)
  .extend({
    top: 10,
    bottom: 5,
    left: 10,
    right: 20,
    background: { r: 125, g: 0, b: 0 },
  })
  .toFile('sharp_extend.jpg');
//이미지의 일부를 추출한다.
sharp(imagePath)
  .extract({ left: 0, top: 600, width: 800, height: 700 })
  .toFile('sharp_extract.jpg');
sharp(imagePath)
  .rotate(90) //이미지를 회전한다.
  .toFile('sharp_rotate.jpg');
sharp(imagePath)
  .flip() //이미지를 상하 뒤집는다.
  .toFile('sharp_flip.jpg');
sharp(imagePath)
  .flop() //이미지를 좌우 뒤집는다.
  .toFile('sharp_flop.jpg');
sharp(imagePath)
  .tint({ r: 0, g: 0, b: 255 }) //이미지 색조를 변경한다.
  .toFile('sharp_tint.jpg');
sharp(imagePath)
  .greyscale() //8비트 흑백 이미지로 변경한다.
  .toFile('sharp_greyscale.jpg');
```
