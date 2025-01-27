// const body = document.querySelector("body");
// body.addEventListener("mouseover", eyeball);



// function eyeball(event) {

//  let eyes = document.querySelectorAll(".eye");

//   eyes.forEach((eye) => {
//     let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
//     let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
//     let radian = Math.atan2(event.pageX - x, event.pageY - y);
//    let rotate = radian * (180 / Math.PI) * -1 +270
//    eye.style.transform = `rotate(${rotate}deg)`
    
//   });
// }




// Define the throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const eyes = document.querySelectorAll(".eye");



    
  
    // Cache eye positions
    const eyePositions = Array.from(eyes).map((eye) => {
      const rect = eye.getBoundingClientRect();
      console.log(rect);
      
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        element: eye,
      };
    });
  
    // Attach throttled mousemove event listener
    document.body.addEventListener(
      "mousemove",
      throttle((event) => {
        const { pageX: mouseX, pageY: mouseY } = event;
  
        eyePositions.forEach(({ x, y, element }) => {
          const radian = Math.atan2(mouseX - x, mouseY - y);
          const angle = radian * (180 / Math.PI) * -1 + 270;
          element.style.transform = `rotate(${angle}deg)`;
        });
      }, 16) // Throttled to ~60fps
    );
  });
  