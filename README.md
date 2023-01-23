Thai Lottery API
================

An API for checking latest Thai Lottery

Requirements
------------

- [Bun](https://bun.sh)

Development
-----------

```sh
$ bun i
$ bun run dev
```

Building for production
---

We packed application to production by using Docker images.

```sh
$ docker build -t runtime .
```

Limitations
-----------

This API crawl data from sanook.com and the API cannot handle URL in case of 404 yet

API
---

The API is based on HTTPS requests and JSON responses. The stable HTTPS endpoint for the latest version is: `https://lotto.api.rayriffy.com`

### Get latest lottery result

##### request
`GET /latest`

##### response
<details>
<summary>JSON</summary>

```json
{  
  "status":"success",
  "response":{  
    "date":"30 ธันวาคม 2561",
    "endpoint":"https://news.sanook.com/lotto/check/30122561/",
    "prizes":[  
      {  
        "id":"prizeFirst",
        "name":"รางวัลที่ 1",
        "reward":"6000000",
        "amount":1,
        "number":[  
          "735867"
        ]
      },
      {  
        "id":"prizeFirstNear",
        "name":"รางวัลข้างเคียงรางวัลที่ 1",
        "reward":"100000",
        "amount":2,
        "number":[  
          "735866",
          "735868"
        ]
      },
      {  
        "id":"prizeSecond",
        "name":"รางวัลที่ 2",
        "reward":"200000",
        "amount":5,
        "number":[  
          "031880",
          "466182",
          "548097",
          "838262",
          "990824"
        ]
      },
      {  
        "id":"prizeThrid",
        "name":"รางวัลที่ 3",
        "reward":"80000",
        "amount":5,
        "number":[  
          "049590",
          "063523",
          "237012",
          "259642",
          "348399"
        ]
      },
      {  
        "id":"prizeForth",
        "name":"รางวัลที่ 4",
        "reward":"40000",
        "amount":50,
        "number":[  
          "018432",
          "025422",
          "049808",
          "056211",
          "094398",
          "121783",
          "148104",
          "148638",
          "150056",
          "189221",
          "196152",
          "219869",
          "227554",
          "237802",
          "260728",
          "268460",
          "286869",
          "288547",
          "317267",
          "320072",
          "346821",
          "379926",
          "383854",
          "388285",
          "412794",
          "412948",
          "449958",
          "461152",
          "474792",
          "489937",
          "527656",
          "537851",
          "556221",
          "594958",
          "644732",
          "646556",
          "682687",
          "731295",
          "771266",
          "840258",
          "867152",
          "897648",
          "903266",
          "943811",
          "953370",
          "961883",
          "964917",
          "978357",
          "983361",
          "995186"
        ]
      },
      {  
        "id":"prizeFifth",
        "name":"รางวัลที่ 5",
        "reward":"20000",
        "amount":100,
        "number":[  
          "015058",
          "028293",
          "028606",
          "053976",
          "057188",
          "076979",
          "086025",
          "088404",
          "114402",
          "115726",
          "123167",
          "124132",
          "144169",
          "162592",
          "164805",
          "168795",
          "169152",
          "170811",
          "179718",
          "182023",
          "190866",
          "225839",
          "227691",
          "231646",
          "231912",
          "241934",
          "251830",
          "278673",
          "279372",
          "281526",
          "284837",
          "293893",
          "294604",
          "294670",
          "304360",
          "314093",
          "321218",
          "335344",
          "392746",
          "401511",
          "426861",
          "433739",
          "437494",
          "444284",
          "444854",
          "447606",
          "449838",
          "451979",
          "455457",
          "483172",
          "491712",
          "527546",
          "555996",
          "564587",
          "565011",
          "572138",
          "579551",
          "587670",
          "599175",
          "600249",
          "609415",
          "616992",
          "617281",
          "632558",
          "636087",
          "648256",
          "661753",
          "669104",
          "672017",
          "687652",
          "697383",
          "702306",
          "702607",
          "708124",
          "720464",
          "722030",
          "744770",
          "775333",
          "779634",
          "785705",
          "795585",
          "795779",
          "807768",
          "827729",
          "831475",
          "833686",
          "839802",
          "840137",
          "845082",
          "854427",
          "855559",
          "861761",
          "872372",
          "874608",
          "880273",
          "893374",
          "913405",
          "954538",
          "961018",
          "982520"
        ]
      }
    ],
    "runningNumbers":[  
      {  
        "id":"runningNumberFrontThree",
        "name":"รางวัลเลขหน้า 3 ตัว",
        "reward":"4000",
        "amount":2,
        "number":[  
          "701",
          "884"
        ]
      },
      {  
        "id":"runningNumberBackThree",
        "name":"รางวัลเลขท้าย 3 ตัว",
        "reward":"4000",
        "amount":2,
        "number":[  
          "701",
          "884"
        ]
      },
      {  
        "id":"runningNumberBackTwo",
        "name":"รางวัลเลขท้าย 2 ตัว",
        "reward":"2000",
        "amount":1,
        "number":[  
          "02"
        ]
      }
    ]
  }
}
```
</details>

### List past lottery date

##### request
`GET /list/[:page?]`

##### response
<details>
<summary>JSON</summary>

```json
{  
  "status":"success",
  "response":[  
    {  
      "id":"30122561",
      "url":"/lotto/30122561",
      "date":"30 ธันวาคม 2561"
    },
    {  
      "id":"16122561",
      "url":"/lotto/16122561",
      "date":"16 ธันวาคม 2561"
    },
    {  
      "id":"01122561",
      "url":"/lotto/01122561",
      "date":"1 ธันวาคม 2561"
    },
    {  
      "id":"16112561",
      "url":"/lotto/16112561",
      "date":"16 พฤศจิกายน 2561"
    },
    {  
      "id":"01112561",
      "url":"/lotto/01112561",
      "date":"1 พฤศจิกายน 2561"
    },
    {  
      "id":"16102561",
      "url":"/lotto/16102561",
      "date":"16 ตุลาคม 2561"
    },
    {  
      "id":"01102561",
      "url":"/lotto/01102561",
      "date":"1 ตุลาคม 2561"
    },
    {  
      "id":"16092561",
      "url":"/lotto/16092561",
      "date":"16 กันยายน 2561"
    },
    {  
      "id":"01092561",
      "url":"/lotto/01092561",
      "date":"1 กันยายน 2561"
    },
    {  
      "id":"16082561",
      "url":"/lotto/16082561",
      "date":"16 สิงหาคม 2561"
    },
    {  
      "id":"01082561",
      "url":"/lotto/01082561",
      "date":"1 สิงหาคม 2561"
    }
  ]
}
```
</details>

### Get past lottery result

##### request
`GET /lotto/[:id]`

`[:id]` can be obtain from `/list`

##### response
<details>
<summary>JSON</summary>

```json
{  
  "status":"success",
  "response":{  
    "date":"1 ธันวาคม 2561",
    "endpoint":"https://news.sanook.com/lotto/check/01122561",
    "prizes":[  
      {  
        "id":"prizeFirst",
        "name":"รางวัลที่ 1",
        "reward":"6000000",
        "amount":1,
        "number":[  
          "021840"
        ]
      },
      {  
        "id":"prizeFirstNear",
        "name":"รางวัลข้างเคียงรางวัลที่ 1",
        "reward":"100000",
        "amount":2,
        "number":[  
          "021839",
          "021841"
        ]
      },
      {  
        "id":"prizeSecond",
        "name":"รางวัลที่ 2",
        "reward":"200000",
        "amount":5,
        "number":[  
          "062948",
          "127470",
          "288347",
          "548436",
          "628614"
        ]
      },
      {  
        "id":"prizeThrid",
        "name":"รางวัลที่ 3",
        "reward":"80000",
        "amount":5,
        "number":[  
          "270065",
          "464017",
          "473504",
          "530912",
          "575061"
        ]
      },
      {  
        "id":"prizeForth",
        "name":"รางวัลที่ 4",
        "reward":"40000",
        "amount":50,
        "number":[  
          "016086",
          "116226",
          "124870",
          "129956",
          "169205",
          "182461",
          "187910",
          "189146",
          "205144",
          "207414",
          "242734",
          "256039",
          "283334",
          "301910",
          "336526",
          "352184",
          "362582",
          "382852",
          "394749",
          "394958",
          "397740",
          "401668",
          "404330",
          "407257",
          "438263",
          "473839",
          "576342",
          "585200",
          "594545",
          "603363",
          "611618",
          "633252",
          "636183",
          "637833",
          "690892",
          "709491",
          "730042",
          "731791",
          "755978",
          "792456",
          "876942",
          "883662",
          "898711",
          "947046",
          "971620",
          "987205",
          "988277",
          "992200",
          "995247",
          "995971"
        ]
      },
      {  
        "id":"prizeFifth",
        "name":"รางวัลที่ 5",
        "reward":"20000",
        "amount":100,
        "number":[  
          "013109",
          "024421",
          "026991",
          "031643",
          "050657",
          "058926",
          "069749",
          "071412",
          "076515",
          "080316",
          "092905",
          "096928",
          "111764",
          "137488",
          "210276",
          "216370",
          "218749",
          "235889",
          "244712",
          "250170",
          "255504",
          "257666",
          "262364",
          "273440",
          "305286",
          "310466",
          "334375",
          "339161",
          "345423",
          "353899",
          "360663",
          "363981",
          "364818",
          "373331",
          "381198",
          "395963",
          "421785",
          "428210",
          "437231",
          "529822",
          "546498",
          "553767",
          "555761",
          "559922",
          "560040",
          "563302",
          "588125",
          "593122",
          "594897",
          "601621",
          "618166",
          "620234",
          "623563",
          "627915",
          "629906",
          "634940",
          "641039",
          "641321",
          "667984",
          "670679",
          "674943",
          "682070",
          "690240",
          "694936",
          "709212",
          "713159",
          "714334",
          "720766",
          "765748",
          "766906",
          "770412",
          "774771",
          "783683",
          "785299",
          "797030",
          "803837",
          "804359",
          "817707",
          "840520",
          "852313",
          "852630",
          "856027",
          "856216",
          "857880",
          "869371",
          "873773",
          "875098",
          "876651",
          "917189",
          "932242",
          "934569",
          "935834",
          "936538",
          "937265",
          "944402",
          "958246",
          "971100",
          "987737",
          "988424",
          "993708"
        ]
      }
    ],
    "runningNumbers":[  
      {  
        "id":"runningNumberFrontThree",
        "name":"รางวัลเลขหน้า 3 ตัว",
        "reward":"4000",
        "amount":2,
        "number":[  
          "561",
          "988"
        ]
      },
      {  
        "id":"runningNumberBackThree",
        "name":"รางวัลเลขท้าย 3 ตัว",
        "reward":"4000",
        "amount":2,
        "number":[  
          "561",
          "988"
        ]
      },
      {  
        "id":"runningNumberBackTwo",
        "name":"รางวัลเลขท้าย 2 ตัว",
        "reward":"2000",
        "amount":1,
        "number":[  
          "67"
        ]
      }
    ]
  }
}
```
</details>

Contributing
------------

We welcome all contributions by sending PR to this repository.

Need Help ?
-----------

If you need help with anything, here're following methods:

#### Create an Issue

If you have something you want to discuss in detail, or have hit an issue which you believe others will also have in deployment or development of the system, [opening an issue](https://github.com/rayriffy/thai-lotto-api/issues) is the best way to get help. It creates a permanent resource for others wishing to contribute to conversation.
