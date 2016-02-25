//Города по умолчанию
var citys = {'london' : {}, 'new york' :{} };
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
//запрос к API по имени города
function getRequest(name){
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
              return value;
}
};
  

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    var name = document.querySelector("#cityName").value;
    
    //проверка - название гороа состоит только из букв, пробелов и дефисов
    
    reg = /^[A-Za-z\s-]+$/i;
    if (reg.test(name)){
    //берем имя города
    
    //переносим в строку и все буквы маленькие
    name = name.toString();
    name = name.toLowerCase();
    var storage = JSON.parse(localStorage.getItem("citys"));
    
    //если такого объекта еще нет - это новый город, можно его добавлять
    if (typeof(storage[name]) == "undefined"){
        var value = getRequest(name);
   

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
        else{
              alert("Такой уже есть");
        }
    }else{
        alert('Ошибка в имени города, проверьте еще раз что вы ввели');
    }
});
//Добавляем иконки на страницу
function weatherIcons(val){
      document.querySelector(".temp-img").style.display = val;
      document.querySelector(".weather-img").style.display = val;
}
function openWeather(){
    event.preventDefault;
      var cityName = event.target.name;
      weatherIcons('block');
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
 var object = getRequest(cityName);
          
          var temp = object.main.temp;    
          var sky = object.weather[0].main;  
          
          
          //добавляем data атрибут с именем города
          document.querySelector("#weatherSky").setAttribute('parent', name);
          document.querySelector("#weatherTemp").setAttribute('parent', name);
          
          document.querySelector("#weatherTemp").innerHTML = +temp;
            
          //непонятно почему не работает без "" перед переменной
          document.querySelector("#weatherSky").innerHTML = ""+sky;
          
    
}

//удаляем город
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
    weatherIcons('none');
    
    if (document.querySelector("#weatherSky").getAttribute('parent') == cityName){
        document.querySelector("#weatherSky").innerHTML = "";
        document.querySelector("#weatherTemp").innerHTML = "";
    }
}
