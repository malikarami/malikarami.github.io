function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 500);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

const members = [
  'Maryam', 'Najmeh', 'Fatemeh', 'Alireza K.', 'Shahrzad', 'Amirhossein', 'Noushin', 'Ehsan', 'Farid',
  'Sepehr', 'Alireza H.', 'Mohammad', 'Mahdi', 'Ahmad', 'Behrooz', 'Sepideh'
]

docReady(function() {
  // DOM is loaded and ready for manipulation here
  const showButton = () => document.getElementById("show-button");
  const meButton = () => document.getElementById("me-button");
  const removeButton = () => document.getElementById("remove-button");
  const removeInput = () => document.getElementById("remove-input");
  const name= () => document.getElementById("name");
  let placeHolder = 'Who Am I?';

  name().innerText = placeHolder;

  let currentMember = '';

  const getRandom = (min, max) => {
    const minFloor = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;
  };

  let ref = [...members];

  if (showButton()) {
    showButton().addEventListener("click", () => {
      if (!currentMember) {
        const random = getRandom(0,ref.length - 1);
        currentMember = ref[random];
        name().innerText = currentMember;
        alert('Please hit the "generate again" button if this is you, otherwise click "OK"');
        console.log(currentMember);
        showButton().innerText = 'OK';
      } else if (currentMember) {
        ref = [...ref.filter(member => member !== currentMember)];
        currentMember = '';
        name().innerText = placeHolder;
        showButton().innerText = 'SHOW';
      }
      console.log(ref);
    });
  }

  if (meButton()) {
    meButton().addEventListener("click", () => {
      if (!currentMember) {
        alert('Error: Out of order');
      } else if (currentMember) {
        const random = getRandom(0,ref.length - 1);
        currentMember = ref[random];
        name().innerText = currentMember;
      }
      console.log(ref);
    });
  }

  if (removeButton()) {
    removeButton().addEventListener("click", () => {
      const memberToRemove = removeInput().value;
      const index = ref.indexOf(memberToRemove);
      if (!memberToRemove || index <= -1) {
        alert('NOT FOUND');
      } else {
        ref = [...ref.filter(member => member !== memberToRemove)];
        removeInput().value = '';
        alert(`${memberToRemove} Is Removed`);
      }
    });
    console.log(ref);
  }
})