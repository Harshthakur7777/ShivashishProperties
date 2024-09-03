document.getElementsByClassName('searchbtn').addEventListener("click",()=>{
    const p = document.getElementsByClassName('propertyselect');
    const l = document.getElementsByClassName('locationselect');
    console.log(p)
    console.log(l)
})
/*
function myFun(){
    const ans = document.getElementsByClassName('searchbtn')
    var a = 0;
    var b = 0;
    ans[0].addEventListener("click",()=>{
        const p = document.getElementsByClassName('propertyselect');
        const l = document.getElementsByClassName('locationselect');
        a = p[0].value
        b = l[0].value
    })
    return [a,b];
}
module.exports = myFun
*/