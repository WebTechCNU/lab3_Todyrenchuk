const burgerIcon = document.querySelector('.burger-icon');
const menu = document.querySelector('.burger-elements');

burgerIcon.addEventListener('click', () => {
  menu.classList.toggle('show');
  console.log("+++");
});

//бургер меню



const card = document.querySelector(".block");
let blocks = document.querySelector(".blocks");

let data = bakeryItemsConst;

let moreBtn = document.querySelector(".moreBtn");

moreBtn.addEventListener("click", ()=>{ //при натичнені кнопки більше додаються інші картки
  addBlocks(data);
})

addBlocks(bakeryItemsConst);

addAD();



blocks.addEventListener("click", (event)=>{ //відкриття опису
  if(event.target.classList.contains("name")){
      const pDescribe = event.target.parentNode.querySelector(".describe");
      pDescribe.classList.toggle("show");
  }
})


setTimeout(() => { //таймер відкриття вікна про підписку
  if (!checkCookie()) {
    document.querySelector(".subscribe-window").classList.add("show"); 
  }
}, 4000);

function checkCookie() {
  let cookieValue = document.cookie.split(';').find(row => row.startsWith('subscribe='));//розділяємо строку на значення
  console.log(cookieValue)
  if(cookieValue === undefined) return false;
  
  cookieValue = cookieValue.split('=')[1];

  if(cookieValue === "true"){
    return true;
  }
  else return false;
}

function setCookie() {
  document.cookie = "subscribe=true"; //ставимо в cookie значення true при натиснені accept
}

function addAD() {//додає рекламу

  setTimeout(() => { //встановлення таймеру
    let advertise = document.querySelector(".advertise");
    advertise.classList.add("show");

    const timer = document.querySelector(".timer");
    const close = document.querySelector(".close");

    let sec = 6;

    const count = () => { //відлік 6 секунд до закриття
      sec--;
      timer.innerHTML = sec;

      if (sec === 0) {
        timer.style.display = "none";
        close.style.display = "block";

        close.addEventListener("click",()=>{ 
          addAD();
          adRemove();
        });

      } else {
        setTimeout(count, 1000);
      }
    };

    count();
  }, 6000);
}

function adRemove() { //додавання реклами
  let advertise = document.querySelector(".advertise");
  advertise.classList.remove("show");
}

function removeWindow() {//прибирання вікна підписки
  let subscribeWindow = document.querySelector(".subscribe-window");
  subscribeWindow.classList.remove("show");
}



function filter(value){//фільтр значень

  let blocks = document.querySelector(".blocks");

  blocks.innerHTML = "";

  
  if(value === 0){
    addBlocks(bakeryItemsConst)
    return bakeryItemsConst;
  }
  
  let filteredData = [];
  bakeryItemsConst.forEach(elem => {
    if (elem.category === value)
        filteredData.push(elem);
        console.log(elem)
  
  });

  addBlocks(filteredData);

  return filteredData;

}


let All = document.querySelector(".all");
let New = document.querySelector(".new");
let MostOrder = document.querySelector(".most");

All.addEventListener("click", ()=>{
  blocks.innerHTML = ""
  data = filter(0);
  All.classList.add("active")
  New.classList.remove("active")
  MostOrder.classList.remove("active")
})

New.addEventListener("click", ()=>{
  blocks.innerHTML = "";
  data = filter(1);
  All.classList.remove("active")
  New.classList.add("active")
  MostOrder.classList.remove("active")
  
})

MostOrder.addEventListener("click", ()=>{
  blocks.innerHTML = "";
  data = filter(2);
  All.classList.remove("active")
  New.classList.remove("active")
  MostOrder.classList.add("active")
})


function addBlocks(data) { //додавання карток на сторінку

  let blocks_container = document.querySelector(".blocks");
  let blocks = "";

  let i = blocks_container.childElementCount; //зчитування кількості карток , які вже є на сторінці

  while ((i < blocks_container.childElementCount + 8) && (i < data.length)) {
    blocks += `
      <div class="block">
        <img src="images/${data[i].link}">
        <p class="name">${data[i].name}</p>
        <p class="describe">${data[i].description}</p>
        <button class = "buy">To Cart</button>
      </div>
    `;
    i++;
  };

  blocks_container.innerHTML += blocks;

  let len = document.querySelector(".blocks").childElementCount;
  let moreBtn = document.querySelector(".moreBtn");

  if (len === data.length) //перевірка чи всі елементи вже виведено, ховатється кнопка більше
    moreBtn.style.display = "none";
  else
    moreBtn.style.display = "block";
 
}










