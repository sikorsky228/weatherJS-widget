//Города по умолчанию
var citys = {london : {}, ny :{} };
//ключ для api погодного сервиса
var apikey = '82a0816e42bd78a6425eb1adca71428f';

var form = document.querySelector("#form");
    
//Есть ли у юзера уже настройки
if (localStorage.getItem('citys') === null) {
    //Впервые на сайте

    //добавляем дефолт в storage
    var storedNames = JSON.stringify(citys);
    localStorage.setItem("citys", storedNames);

    
    //выводим кнопки с городами
    for (var cityName in citys){
        createButton(cityName);
    }

}
    else {
        //юзер уже был на сайте
        //берем данные из storage
        var storage = JSON.parse(localStorage.getItem("citys"))

        //выводим кнопки с городами
        for (var cityName in storage){
            createButton(cityName);
        }
        
    }
    
  

form.addEventListener("submit", function(event){
    event.preventDefault();
    //берем имя города
    var name = document.querySelector("#cityName").value;
    //переносим в строку и все буквы маленькие
    name = name.toString();
    name = name.toLowerCase();
    var storage = JSON.parse(localStorage.getItem("citys"));
    
    //если такого объекта еще нет - это новый город, можно его добавлять
    if (typeof(storage[name]) == "undefined"){
        
    event.preventDefault();
    var gcn = new XMLHttpRequest();
    //приводим к строке и делаем все буквы маленькими, для простоты проверок в дальнейшем
    var params = 'q=' + encodeURIComponent(name) + "&appid=" + encodeURIComponent(apikey) + "&units=metric";
    var request = "http://api.openweathermap.org/data/2.5/weather?" + params;
    gcn.open("GET", request, false);

    gcn.send();
    if (gcn.status != 200) {
             //обработать ошибку
            alert('Ошибка ' + gcn.status + ': ' + gcn.statusText);
          } else {
              
              var value = JSON.parse(gcn.responseText);

              //Добавляем новый город в storage
              //Берем то что там уже есть
              //и добавляем новый город             
              storage[name] = {};
              storedNames = JSON.stringify(storage);
              localStorage.setItem("citys", storedNames);
              
              //функция добавления кнопки с городом
              createButton(name);
              //Очищаем поле для ввода
              document.querySelector("#cityName").value = "";
              
 }    

}        
                        
    else{
          alert("Такой уже есть");
    }
});
    
function openWeather(){
    event.preventDefault;
      var cityName = event.target.name;
      loadWeather(cityName);
}
    
function createButton(buttonName){
    var block = document.createElement('div');
    block.id=buttonName;
    document.querySelector("#divButtons").appendChild(block);
    var button = document.createElement('button');
          button.name = buttonName;
          button.id = buttonName;
          button.innerHTML = buttonName;
          button.onclick = function() {openWeather() };
          block.appendChild(button);
    var deleteButton = document.createElement('span');
          deleteButton.name = buttonName;
          deleteButton.onclick = function() {removeBlock(buttonName) };
          block.appendChild(deleteButton);
    
}
function loadWeather(cityName) {
 var gcn = new XMLHttpRequest();
    var name = cityName;

    var params = 'q=' + encodeURIComponent(name) + "&appid=" + encodeURIComponent(apikey) + "&units=metric";
    var request = "http://api.openweathermap.org/data/2.5/weather?" + params;

    gcn.open("GET", request, false);

    gcn.send();
    if (gcn.status != 200) {
             //обработать ошибку
            alert('Ошибка ' + gcn.status + ': ' + gcn.statusText);
          } else {
              var object = JSON.parse(gcn.responseText);
              
          var temp = object.main.temp;
          var sky = object.weather[0].main;
          //добавляем data атрибут с именем города
          document.querySelector("#weatherSky").setAttribute('parent', name);
          document.querySelector("#weatherTemp").setAttribute('parent', name);
              
          document.querySelector("#weatherSky").innerHTML = "Clouds: "+sky;
          document.querySelector("#weatherTemp").innerHTML = "Temp:" +temp;
    }
}
function removeBlock(cityName){
    var element = document.getElementById(cityName);
    element.parentNode.removeChild(element);
                                   
    //удаляем из local.storage город
    var storage = JSON.parse(localStorage.getItem("citys"))
    delete storage[cityName];
    
    //обновляем local.storage
    storedNames = JSON.stringify(storage);
    localStorage.setItem("citys", storedNames);
    
    //удаляем данные погоды на странице, если они были включены
    if (document.querySelector("#weatherSky").getAttribute('parent') == cityName){
        document.querySelector("#weatherSky").innerHTML = "";
        document.querySelector("#weatherTemp").innerHTML = "";
    }
}