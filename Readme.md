backend/
│
├── app/
│   ├── main.py                              ✅
│   │
│   ├── core/
│   │   └── config.py                        ✅
│   │
│   ├── schemas/
│   │   └── lab.py                           ✅
│   │
│   ├── api/
│   │   ├── lab_routes.py                    ✅
│   │   └── analysis_routes.py               ✅
│   │
│   ├── services/
│   │   ├── lab_processor.py                 ✅ Classification
│   │   ├── data_service.py                  ✅ Dataset loading
│   │   ├── lab_service.py                   ✅ Dataset services
│   │   └── analysis_service.py              ✅ Analyze + summary
│   │
│   ├── mcp/
│   │   └── server.py                        ✅ MCP tools complete
│   │
│   ├── agents/
│   │   └──                                  ⏳ NEXT
│   │
│   └── data/
│       └── dataset.csv                      ✅ Kaggle dataset
│
├── .env                                     ✅
├── .gitignore                               ✅
├── requirements.txt                         ✅
└── README.md                                ⏳ Final