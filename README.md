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
    * [ ] Точки (достопримечательности, памятники и тд.)
    * [ ] Изображения для точек
    * [ ] Маршруты по точкам
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


```bash
cd нужный каталог
git clone https://github.com/alchemistOfWeb/ulyanovsk_guided_tours.git
cd ulyanovsk_guided_tours/django
pipenv
```

### 2 Секретный ключ
<a name="create_secret_key"></a> 

Для начала скопируйте файл .env.example и уберите строку `.example` из названия копии (оставьте только `.env`)

Создайте секретный ключ и добавьте в настройки соответствующими командами:
```bash
pipenv run manage.py shell
>>> from django.core.management.utils import get_random_secret_key
>>> print(get_random_secret_key()) # скопируйте полученный этой командой ключ
>>> exit()
dotenv set SECRET_KEY 'getted_secret_key' # где getted_secret_key нужно вставить полученный ключ
```

### 3 Настройка базы данных
<a name="setup_db"></a> 

Установите настройки для вашей бд в `.env` файле. Ниже приведён пример и названия параметров, которые можно использовать. 
```py
DB_NAME='opinion_scrapper'
DB_USER='admin'
DB_PASS='admin'
DB_HOST='127.0.0.1'
DB_PORT='5432'
```
По умолчанию используется движок `postgress`, для его изменения измените значение словаря `DATABASES` в `opinion_scrapper/settings.py`.
Посмотреть корректные названия движков для подключения к др. базам данных можно на https://docs.djangoproject.com/en/3.1/ref/databases/

### 4 Миграции
<a name="migrations"></a> 

Сделайте миграции в вашу бд
```bash
pipenv run manage.py makemigrations
pipenv run manage.py migrate
```

### 6 Для доступа к админке 
<a name="admin_panel"></a> 

> Пропустите этот шаг, если вы выполнили django-миграцию бд (см. шаг 3)

Создайте суперюзера для доступа к админке
```bash
pipenv run manage.py create superuser
name: ******* # придумайте, например admin
pas: ********** # придумайте, например admin
```

### 7 Запуск тестового сервера
<a name="test_server"></a> 

теперь можно запустить тестовый сервер
```bash
pipenv run manage.py runserver
```

## 3. Описание функционала приложения
<a name="description"></a> 

### регистрация/вход
<a name="auth"></a> 

Нового пользователя может создать только админ. Вход стандартный из коробки django


### пользователи
<a name="users"></a> 

Cтандартно из коробки django

### ссылки на все товары
<a name="points"></a>

dddddddd

### список комментариев(отзывов) пользователей
<a name="paths"></a>

ddddddddd