# Ulynovsk guided tours app
#### developed by anonymous


* [1. Формулировка тз](#task_description)
* [2. Установка и настройка](#setup)
    * [1. Установка зависимостей](#dependences)
    * [2. Секретный ключ](#create_secret_key)
    * [3. Настройка базы данных](#setup_db)
    * [4. Миграции](#migrations)
    * [5. Предварительный парсинг всех продуктов](#scrap_sitemap)
    * [6. Для доступа к админке ](#admin_panel)
    * [7. Запуск тестового сервера](#test_server)
* [3. Описание функционала приложения](#description)
    * [Регистрация и вход](#auth)
    * [Пользователи](#users)
    * [Точки на карте](#points)
    * [Маршруты](#paths)
    * [Отзывы](#reviews)


## 1. Формулировка тз:
<a name="task_description"></a> 


### Общие требования: 

* Создание приложения для экскурсовода​ “Литературное наследие Ульяновских/Симбирских писателей” 


* Сайт
    * [ ] Карта с отмеченными точками и возможности выбрать маршрут
        * [ ] При клике по точке можно прочитать инфу и посмотреть изображения
        * [ ] Можно выбрать маршрут из списка и он отметиться на карте
    * [ ] Ссылка на скачивание мобильного приложения
    * [ ] ...
* Админка
    * [ ] Точки (достопримечательности, памятники, барельефы, постройки и тд.)
        * [ ] название
        * [ ] описание (поле ckeditor)
        * [ ] ссылка на главное изображение
        * [ ] набор изображений (соединяется промежуточной таблицей)
    * [ ] Изображения для точек
    * [ ] Маршруты по точкам
        * [ ] Скорее всего Json-field, хотя мб и нет
    * [ ] Категории точек
    * [ ] ...
* Мобильное приложение
    * [ ] ...

<br>

---
---
---
---

<br>  

## 2. Установка и настройка
<a name="setup"></a> 

### 1 Установка зависимостей
<a name="dependences"></a> 

Для начала установите python.
Допустимы версии от 3.7


Для начала установите python3 версии не ниже 3.7 (https://www.python.org/downloads/)
Установите node.js вместе с npm версии выше 7.14 (https://nodejs.org/en/)

установите pipenv 
```bash
pip install --user pipenv
```
> (подробнее здесь: https://semakin.dev/2020/04/pipenv/)


Скачать приложение можно перейдя на сайт https://github.com/alchemistOfWeb/forumKEI.git
или же, выполнив команду ниже из каталоги где в дальнейшем будет лежать код проекта.
```bash
git clone https://github.com/alchemistOfWeb/forumKEI.git 
```

Далее создайте второе окно терминала. 
> В дальнейшем будут использоваться два окна терминала - одно для для настройки сервера для django, а другое для сервера node.js, предназначенного для формирования клиентской, статической части приложения.

В первом окне перейдите в каталог django с помощью команды `cd django/` и введите следующую команду:
```bash
pipenv install # чтобы установить все зависимости для python и django
```

В втором окне перейдите в каталог reactapp от корня проекта и введите следующее:
```bash
npm install # чтобы установить зависимости для js и react
```

### 2 Генерация секретного ключа
<a name="create_secret_key"></a> 

Для начала скопируйте файл .env.example и уберите строку `.example` из названия копии (оставьте только `.env`)

Далее создадим секретный ключ

> В первом терминале(где django):
```bash
pipenv run manage.py shell
>>> from django.core.management.utils import get_random_secret_key
>>> print(get_random_secret_key()) # скопируйте полученный этой командой ключ
>>> exit()
```

А теперь добавим его в настройки
```bash
pipenv run dotenv set SECRET_KEY "getted_secret_key"
```
> заместо `getted_secret_key` нужно вставить полученный ранее ключ, не убирая двойные кавычки.


### 3 Настройка базы данных
<a name="setup_db"></a> 

По умолчанию используется sqlite в качестве тестовой бд. Если хотите то вы можете установить свои настройки для бд в settings.py.

Информация о подключении к другим бд: https://docs.djangoproject.com/en/3.1/ref/databases/

### 4 Миграции
<a name="migrations"></a> 

Сделайте миграции в вашу бд (из первого терминала - django)
```bash
pipenv run manage.py migrate
```

### 5 Импорт базы данных
<a name="migrations"></a> 

Для импорта (из первого терминала - django)
```bash
pipenv run manage.py loaddata db.json
```

> Также в будущем вы можете сделать экспорт с помощью следующей команды
```bash
pipenv run manage.py dampdata db.json
```

### 6 Для доступа к админке
<a name="admin_panel"></a> 

> Пропустите этот шаг, если вы выполнили импорт базы данных (см. шаг 5)

Создайте суперюзера для доступа к админке (из первого терминала - django)
```bash
pipenv run manage.py create superuser
name: ******* # придумайте, например admin
pas: ********** # придумайте, например admin
```

### 7 Запуск тестового сервера(ok)
<a name="test_server"></a> 

теперь можно запустить тестовый сервер 
> (из первого терминала - django)
```bash
pipenv run manage.py runserver
```

> (из второго терминала - reactapp)
```bash
npm start
```

## 3. Описание функционала приложения
<a name="description"></a> 

### регистрация/вход
<a name="auth"></a> 

Система регистрации/авторизации как для персонала, так и для желающих оставить отзыв или заказ экскурсию пользователей.
Вход в административную панель стандартный из коробки django.

### пользователи
<a name="users"></a> 

Cтандартно из коробки django + создана модель Profile для того чтобы дополнить стандартную модель полем для хранения ФИО.

### точки маршрута (Достопримечательности)
<a name="points"></a>

Показываются на интерактивной карте. При клике выводится инфа в панель сбоку или снизу.

### маршруты
<a name="paths"></a>

На карте показывается один вариант. Смена маршрута - при клике на элемент списка маршрутов сбоку или где-то ещё.

### отзывы
<a name="reviews"></a>

Показываются на отдельной странице


### Useful resources

> use for deleting some strange messages with word 'audit'
> ```npm config set fund false ``` 
