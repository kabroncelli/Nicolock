# Nicolock
---

The Nicolock marketing platform.

### Circle CI
[![Circle CI](https://circleci.com/gh/lightningkite/nicolock.svg?style=svg&circle-token=1afe2122a91d156338258b174b129c605f6ae1c1)](https://circleci.com/gh/lightningkite/nicolock)

### Development

Note: Make sure you are in the root of the project for all of these commands.

To get the django backend up and running:

```
docker-compose up
```
or (if you want to be able to do breakpoints with ipdb):

```
docker-compose run --rm --service-ports web python manage.py runserver 0.0.0.0:8000
```

To get the client side stuff up and running (sass and js):

```
npm install
npm start
```

If you want to minify assets the way production will run:

```
npm run build
```

### CSV Import

Only dealers and contractors (company profiles) currently support csv data imports. Here are examples of each:

* [dealer csv](https://github.com/lightningkite/nicolock/blob/master/docs/dealer.csv)
* [contractor csv](https://github.com/lightningkite/nicolock/blob/master/docs/contractor.csv)

Just find the "Import" button in the django admin for each of these models

### Rest Auth API

**Registration:** `/rest-auth/registration/`

**Login:** `/rest-auth/registration/`

More info: [django-rest-auth docs](http://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html)

### API
**Homeowner Contractor List Detail:** `/rest/users/me/contractor-list/`

* Request Methods: GET, PUT, PATCH
* Authentication: Session
* Notes: A contractor list will be created if it doesn't yet exist. Use a PATCH or PUT to update the `contractors` field.
* Example GET Response:

```
{
    "id": 1,
    "contractor_list": [
        {
            "id": 9,
            "name": "Kev",
            "email": "k@k.com",
            "postal_code": "Guy",
            "user_type": "contractor",
            "companyprofile": null
        },
        {
            "id": 2,
            "name": "Bob",
            "email": "bob@bob.com",
            "postal_code": "84321",
            "user_type": "contractor",
            "companyprofile": {
                "user": 2,
                "name": "Lightning Kite",
                "address": "255 S 300 W",
                "longitude": -111.899128,
                "latitude": 40.763681,
                "website": "http://lightningkite.com",
                "phone": "8015895857",
                "email": "kevin@lightningkite.com",
                "contact_name": "Brennen",
                "contact_email": "",
                "contact_phone": "",
                "area_covered": "",
                "specialties": "",
                "description": "",
                "slug": "lightning-kite"
            }
        }
    ],
    "homeowner": 1,
    "contractors": [
        9,
        2
    ]
}
```


**Company Profile Detail:** `/rest/users/me/company-profile/`

* Request Methods: GET, PATCH
* Authentication: Session
* Notes: A company profile will be created if it doesn't yet exist. Use a PATCH to update fields and a GET to retrieve the profile.
* Example Response:

```
{
    "user": 10,
    "name": "",
    "address": "",
    "website": "",
    "phone": "",
    "email": "",
    "contact_name": "",
    "contact_email": "",
    "contact_phone": "",
    "area_covered": "",
    "specialtys": "",
    "description": "Hi!"
}
```

**Product Detail:** `/rest/users/me/company-profile/`

* Request Methods: GET
* Authentication: None required
* Notes: Right now the thumbnail images are returning relative urls for some reason but I can make them return full urls if it becomes a problem.
* Example Response:

```
{
    "id": 1,
    "images": [
        {
            "id": 1,
            "large_thumbnail": "/media/CACHE/images/product_images/Screen_Shot_2016-12-06_at_1.21.10_PM_jylR8Oe/cf246d2b3e39a3c7d4e751b374d49ae8.jpg",
            "thumbnail": "/media/CACHE/images/product_images/Screen_Shot_2016-12-06_at_1.21.10_PM_jylR8Oe/6f98bc17b0dd404c174e3a9903748b83.jpg",
            "name": "image 1",
            "description": "",
            "original": "http://localhost:8000/media/product_images/Screen_Shot_2016-12-06_at_1.21.10_PM_jylR8Oe.png",
            "order": 1,
            "modified": "2016-12-07T06:31:12.014112Z",
            "created": "2016-12-07T06:31:12.014218Z",
            "product": 1
        }
    ],
    "specs": [
        {
            "id": 1,
            "label": "Width",
            "icon": "http://localhost:8000/media/product_specs/hallr_icon_Iplwu0G.jpg",
            "file": "http://localhost:8000/media/taxbot_issues_nvkn8br.md",
            "order": 1,
            "modified": "2016-12-07T06:31:12.071541Z",
            "created": "2016-12-07T06:31:12.071609Z",
            "product": 1
        },
        {
            "id": 2,
            "label": "Height",
            "icon": "http://localhost:8000/media/product_specs/hallr_icon_AprDmXD.jpg",
            "file": "http://localhost:8000/media/finance.md",
            "order": 2,
            "modified": "2016-12-07T06:36:29.928094Z",
            "created": "2016-12-07T06:36:29.928241Z",
            "product": 1
        }
    ],
    "patterns": [
        {
            "id": 1,
            "large_thumbnail": "/media/CACHE/images/product_patterns/Screen_Shot_2016-12-06_at_1.21.10_PM_pCeGh2b/ae078aa7395e91324ede40759a2aed46.jpg",
            "thumbnail": "/media/CACHE/images/product_patterns/Screen_Shot_2016-12-06_at_1.21.10_PM_pCeGh2b/2df825e2540ebfc4c6030a16e26974a8.jpg",
            "name": "Criss Cross",
            "description": "",
            "original": "http://localhost:8000/media/product_patterns/Screen_Shot_2016-12-06_at_1.21.10_PM_pCeGh2b.png",
            "order": 1,
            "modified": "2016-12-07T06:31:12.129988Z",
            "created": "2016-12-07T06:31:12.130033Z",
            "product": 1
        }
    ],
    "colors": [
        {
            "id": 1,
            "name": "Blue",
            "description": "",
            "original": "http://localhost:8000/media/product_colors/Screen_Shot_2016-12-06_at_1.21.10_PM.png",
            "order": 1,
            "modified": "2016-12-07T06:31:12.172144Z",
            "created": "2016-12-07T06:31:12.172195Z",
            "product": 1
        }
    ],
    "files": [
        {
            "id": 1,
            "name": "Doc",
            "file": "http://localhost:8000/media/taxbot_issues_d86JKqh.md",
            "order": 1,
            "modified": "2016-12-07T06:31:12.200509Z",
            "created": "2016-12-07T06:31:12.200663Z",
            "product": 1
        }
    ],
    "name": "Nico's Glock",
    "description": "Such gun",
    "uses": [
        "pool"
    ],
    "like_count": 0,
    "order": 1,
    "modified": "2016-12-07T06:36:29.890936Z",
    "created": "2016-12-07T06:31:11.967790Z",
    "category": 3
}
```

**Category List:** `/rest/categories/`

* Request Methods: GET
* Authentication: None required
* Example Response:

```
[
    {
        "id": 1,
        "products": [],
        "name": "Pavers",
        "modified": "2016-12-07T06:02:11.065924Z",
        "created": "2016-12-07T06:02:11.065962Z"
    },
    {
        "id": 2,
        "products": [],
        "name": "Wall Systems",
        "modified": "2016-12-07T06:02:11.068809Z",
        "created": "2016-12-07T06:02:11.068841Z"
    },
    {
        "id": 3,
        "products": [
            {
                "id": 1,
                "name": "Nico's Glock"
            }
        ],
        "name": "Outdoor Living",
        "modified": "2016-12-07T06:02:11.071774Z",
        "created": "2016-12-07T06:02:11.071810Z"
    },
    {
        "id": 4,
        "products": [],
        "name": "Accents",
        "modified": "2016-12-07T06:02:11.074269Z",
        "created": "2016-12-07T06:02:11.074302Z"
    },
    {
        "id": 5,
        "products": [],
        "name": "Nicostone",
        "modified": "2016-12-07T06:02:11.076841Z",
        "created": "2016-12-07T06:02:11.076875Z"
    }
]
```

**Category Detail:** `/rest/categories/<category_id>/`

* Request Methods: GET
* Authentication: None required
* Example Response:

```
{
    "id": 3,
    "products": [
        {
            "id": 1,
            "name": "Nico's Glock"
        }
    ],
    "name": "Outdoor Living",
    "modified": "2016-12-07T06:02:11.071774Z",
    "created": "2016-12-07T06:02:11.071810Z"
}
```

**Video List:** `/rest/videos/`

* Request Methods: GET
* Authentication: None required
* Notes: Returns all videos in the system
* Example Response:

```
[
    {
        "id": 1,
        "name": "DDX",
        "description": "Choose the right DDX",
        "embed_code": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/T7Owkr6025g\" frameborder=\"0\" allowfullscreen></iframe>",
        "tags": [
            1
        ]
    },
    {
        "id": 2,
        "name": "Key and Peele",
        "description": "So good",
        "embed_code": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mVTmxC_pVqg\" frameborder=\"0\" allowfullscreen></iframe>",
        "tags": [
            2
        ]
    }
]
```

**Video List:** `/rest/videos/`

* Request Methods: GET
* Authentication: None required
* Notes: Returns all videos in the system
* Example Response:

```
[
    {
        "id": 1,
        "name": "DDX",
        "description": "Choose the right DDX",
        "embed_code": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/T7Owkr6025g\" frameborder=\"0\" allowfullscreen></iframe>",
        "tags": [
            1
        ]
    },
    {
        "id": 2,
        "name": "Key and Peele",
        "description": "So good",
        "embed_code": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mVTmxC_pVqg\" frameborder=\"0\" allowfullscreen></iframe>",
        "tags": [
            2
        ]
    }
]
```

**Video Like:** `/rest/videos/<video_id>/like/`

* Request Methods: POST
* Authentication: None required
* Notes: Returns a success message no matter what
* Example Response:

```
{
	"message": "Success!"
}
```

**Video by Tag List:** `/rest/tags/<tag_id>/videos/`


* Request Methods: GET
* Authentication: None required
* Notes: Returns all videos for a given tag
* Example Response:

```
[
    {
        "id": 1,
        "name": "DDX",
        "description": "Choose the right DDX",
        "embed_code": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/T7Owkr6025g\" frameborder=\"0\" allowfullscreen></iframe>",
        "tags": [
            1
        ]
    }
]
```

**Dealer Search:** `/rest/dealers/`

* Request Methods: GET
* Authentication: None required
* Notes: Returns list of all dealers. Also supports a query param `postal_code` that lets you filter by a postal code. Use like this: `/rest/dealers/?postal_code=84321`
* Example Response:

```

[
    {
        "id": 1,
        "name": "Lightning Kite",
        "address": "255 S 300 W",
        "city": "Logan",
        "state": "Utah",
        "postal_code": "84321",
        "phone": "8015895857"
    }
]
```

**Contractor Search:** `/rest/contractors/`

* Request Methods: GET
* Authentication: None required
* Notes: Returns list of all contractors. Also supports a query param `postal_code` that lets you filter by a postal code. Use like this: `/rest/contractors/?postal_code=84321`
* Example Response:

```
[
    {
        "id": 10,
        "name": " ",
        "email": "kevin@lightningkite.com",
        "postal_code": "84321",
        "user_type": "contractor",
        "companyprofile": {
            "user": 10,
            "name": "Freedom Software",
            "address": "",
            "website": "",
            "phone": "",
            "email": "",
            "contact_name": "",
            "contact_email": "",
            "contact_phone": "",
            "area_covered": "",
            "specialties": "",
            "description": ""
        }
    }
]
```

**Search:** `/rest/search/?q=<search-term>`

* Request Methods: GET
* Authentication: None required
* Notes: Returns a list of all products, images, specs, company profiles, videos, dealers, and flatpages that relate to the search term.
* Example Response:


```
{
    "products": [
        {
            "id": 2,
            "images": [
                {
                    "id": 3,
                    "large_thumbnail": "/media/CACHE/images/product_images/pavers-ridge-brick-main/d25615752b9a27ad7cba5180f2fee34b.jpg",
                    "thumbnail": "/media/CACHE/images/product_images/pavers-ridge-brick-main/f97c6a59fd90e12d7fa4650f497e48ec.jpg",
                    "name": "Ridge Brick",
                    "description": "",
                    "original": "/media/product_images/pavers-ridge-brick-main.jpg",
                    "order": 1,
                    "modified": "2017-04-04T17:26:24.677649Z",
                    "created": "2017-01-02T16:48:07.932000Z",
                    "product": 2
                },
                {
                    "id": 4,
                    "large_thumbnail": "/media/CACHE/images/product_images/image-2/fb2cb5b82b16e5a4b493ba7d5a314bc0.jpg",
                    "thumbnail": "/media/CACHE/images/product_images/image-2/16ffee89a4457b2938155e26e04c5819.jpg",
                    "name": "Ridge Brick 2",
                    "description": "",
                    "original": "/media/product_images/image-2.jpg",
                    "order": 2,
                    "modified": "2017-04-04T17:26:24.694426Z",
                    "created": "2017-01-02T16:48:26.960000Z",
                    "product": 2
                }
            ],
            "specs": [
                {
                    "id": 2,
                    "label": "A",
                    "icon": "/media/product_specs/spec.jpg",
                    "file": "/media/test-specs.pdf",
                    "order": 1,
                    "modified": "2017-04-04T17:26:24.749999Z",
                    "created": "2017-01-02T16:50:07.521000Z",
                    "product": 2
                }
            ],
            "patterns": [
                {
                    "id": 2,
                    "large_thumbnail": "/media/CACHE/images/product_patterns/pattern-herringbone/1db241593ac3dfd5154af0fc32b4ddee.jpg",
                    "thumbnail": "/media/CACHE/images/product_patterns/pattern-herringbone/a52ae4d19131c823b985b4a980cbf107.jpg",
                    "name": "Herringbone",
                    "description": "This is the herringbone pattern",
                    "original": "/media/product_patterns/pattern-herringbone.jpg",
                    "order": 1,
                    "modified": "2017-04-04T17:26:24.763815Z",
                    "created": "2017-01-02T16:50:50.977000Z",
                    "product": 2
                }
            ],
            "colors": [
                {
                    "id": 2,
                    "name": "Warrington",
                    "description": "This is the warrington color",
                    "original": "/media/product_colors/color-warrington.jpg",
                    "order": 1,
                    "color_type": "",
                    "modified": "2017-04-04T17:26:24.778389Z",
                    "created": "2017-01-02T16:51:23.976000Z",
                    "product": 2
                }
            ],
            "files": [],
            "name": "Ridge Brick",
            "description": "",
            "uses": [
                "patio",
                "walkway",
                "driveway",
                "pool"
            ],
            "like_count": 6,
            "order": 1,
            "modified": "2017-04-04T17:26:24.663627Z",
            "created": "2017-01-02T16:45:48.966000Z",
            "slug": "ridge-brick",
            "category": 1
        }
    ],
    "images": [
        {
            "id": 3,
            "large_thumbnail": "/media/CACHE/images/product_images/pavers-ridge-brick-main/d25615752b9a27ad7cba5180f2fee34b.jpg",
            "thumbnail": "/media/CACHE/images/product_images/pavers-ridge-brick-main/f97c6a59fd90e12d7fa4650f497e48ec.jpg",
            "name": "Ridge Brick",
            "description": "",
            "original": "/media/product_images/pavers-ridge-brick-main.jpg",
            "order": 1,
            "modified": "2017-04-04T17:26:24.677649Z",
            "created": "2017-01-02T16:48:07.932000Z",
            "product": 2
        },
        {
            "id": 7,
            "large_thumbnail": "/media/CACHE/images/product_images/image-5/58f94186408c02d24873e55d66561b31.jpg",
            "thumbnail": "/media/CACHE/images/product_images/image-5/37f171d59184c8f0704fa02128c9b235.jpg",
            "name": "Ridge Brick 5",
            "description": "",
            "original": "/media/product_images/image-5.jpg",
            "order": 5,
            "modified": "2017-04-04T17:26:24.736209Z",
            "created": "2017-01-02T16:49:42.988000Z",
            "product": 2
        },
        {
            "id": 4,
            "large_thumbnail": "/media/CACHE/images/product_images/image-2/fb2cb5b82b16e5a4b493ba7d5a314bc0.jpg",
            "thumbnail": "/media/CACHE/images/product_images/image-2/16ffee89a4457b2938155e26e04c5819.jpg",
            "name": "Ridge Brick 2",
            "description": "",
            "original": "/media/product_images/image-2.jpg",
            "order": 2,
            "modified": "2017-04-04T17:26:24.694426Z",
            "created": "2017-01-02T16:48:26.960000Z",
            "product": 2
        }
    ],
    "specs": [],
    "companyprofiles": [],
    "videos": [],
    "dealers": [],
    "flatpages": []
}
```

**Gallery List Create:** `/rest/galleries/`

* Request Methods: GET or POST
* Authentication: Required
* Notes: Returns a list of the logged in user's galleries and a POST will allow a user to create a new gallery. Just post up the `name` and `description` (user and slug will be added automatically).
* Example Response:

```
[
    {
        "id": 3,
        "items": [],
        "name": "Another Gallery!",
        "description": "hi!",
        "slug": "another-gallery",
        "user": 1
    },
    {
        "id": 2,
        "items": [],
        "name": "Cool Pics",
        "description": "Cool!",
        "slug": "cool-pics",
        "user": 1
    }
]
```


**Gallery Detail:** `/rest/galleries/<gallery_id>/`

* Request Methods: GET, PUT, PATCH, or DELETE
* Authentication: Required
* Notes: Allows a logged in user to retrieve one of their gallerys or delete or update a gallery
* Example Response:

```
{
    "id": 3,
    "items": [],
    "name": "Another Gallery!",
    "description": "hi!",
    "slug": "another-gallery",
    "user": 1
}
```
