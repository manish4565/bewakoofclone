
let Renderdiv = document.getElementById("cartdiv")
let bag = []
let count = 0;
let arr = JSON.parse(localStorage.getItem("cartData")) || []



async function getdata() {
    let newdata = await fetch("http://localhost:3000/manproduct");
    let product = await newdata.json();

    return product
}

getdata().then((data) => {
    bag = data;
    display(data)
})

// --------------------------------Cart Rendering function start here--------------------------------------------//
function display(data) {
    count = 0;
    let responsedata = data.map((item) => {
     count++
        return `
        <div class="parentcart">
 
   <figure> <img src="${item.img}" alt=""> </figure>
  
     <p id="fashiontrend"> FashionTrend</p>
    <h4><strong>${item.title}</strong></h4>
    <p> <b>₹${item.price}</b></p>
     <p class="description">${item.description}</p>
     <button data-id=${item.id} class="cart"> <b>  Add to Cart  </b> </button>
  
</div>
       
        `


    })
    Renderdiv.innerHTML = responsedata.join("")
    document.getElementById("count").innerText = `(${count})`

    let btn = document.querySelectorAll(".cart");
    
    for(let elem of btn){
      elem.addEventListener("click",async ()=>{
        // console.log(elem.dataset.id)
        let id=elem.dataset.id;
        try {
          let res=await fetch(`http://localhost:3000/manproduct/${id}`,{
            method:"GET",
            headers:{
              "Content-Type": "application/json"
            }
  
          })
          let out = await res.json();
         
          arr.push(out)
        
         localStorage.setItem("cartData",JSON.stringify(arr))
         alert("Product added in cart section")
        } catch (error) {
       alert("something went wrong")   
        }
      })
    }
}
// --------------------------------Cart Rendering function start here--------------------------------------------//


// <-------------------------------price wise sorting data start here------------------------------------------->


document.getElementById("Size").addEventListener("change",function(){
    PriceRenderdata(bag);
  });
  function PriceRenderdata(data){
    let select;
    let enter=document.getElementById("Size").value;
    if(enter=="Price"){
        location.reload()
      return;
    }else if(enter=="LTH"){
      select=data.sort((a,b)=>{
        return a.price-b.price;
      })
    }else if(enter=="HTL"){
      select=data.sort((a,b)=>{
        return b.price-a.price;
      })
    }
    display(select);
  }

// <-------------------------------price wise sorting data end here------------------------------------------->


// <-------------------------------title wise product filter Section start------------------------------------------->



document.getElementById("Category").addEventListener("change",filterProduct);
function filterProduct(){
  let search;
  let given=document.getElementById("Category").value;
  if(given=="category"){
    display(bag);
    return;
  }
  search=bag.filter((elem)=>{
    return elem.title==given;
  })
  display(search);
  document.getElementById("Size").addEventListener("change",function(){
    PriceRenderdata(search);
});
}
// <-------------------------------title wise product filter Section start------------------------------------------->


// ------------------------------- Search functionality -------------------------------//


  
document.getElementById("search").addEventListener("input",()=>{
  
    let searchdata = document.getElementById("search").value
  
    let newData = bag.filter(function(elem){
        return elem.title.toLowerCase().includes(searchdata.toLowerCase())
    })
   display(newData)
   
})  