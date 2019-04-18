http://localhost:9200/_sql?sql=select * from company_base_info_2 where id =14


http://localhost:9200/_sql?sql=select * from company_base_info_2 where name ='62'

http://localhost:9200/company_base_info_2/_search?scroll=10m

http://localhost:9200/_sql?sql=select * from company_base_info_2 where id =15008


http://localhost:9200/_sql?sql=SELECT * FROM company_base_info_2 where name=12


https://github.com/NLPchina/elasticsearch-sql/


https://www.cnblogs.com/yucy/p/7778600.html


http://localhost:9200/_cat/health?v

http://localhost:9200/_cat/nodes?v

http://localhost:9200/_cat/indices?v

http://localhost:9200/company_base_info_2?pretty

http://localhost:9200/company_base_info_3/external/1?pretty



GET /product_index/product/_search
{
  "query": {
    "match_all": {}
  }
}

http://localhost:9200/company_base_info_2/_search{  "query": {    "match_all": {}  }}


http://localhost:9200/company_base_info_2/_search
{
  "query": {
    "match_all": {}
  }
}


http://localhost:9200/company_base_info_2/_search
{"query" : {"bool" : {"must": [{"match_all" : {}}]}},"from" : 0,"size" : 0,"aggregations" : {"age":{"aggregations":{"COUNT(*)":{"count":{"field":"_index"}}},"terms":{"field":"age","size":"1"}}}}


{"query" : {"bool" : {"must": [{"match_all" : {}}]}},"from" : 0,"size" : 0,"aggregations" : {"age":{"aggregations":{"COUNT(*)":{"count":{"field":"_index"}}},"terms":{"field":"age","size":"1"}}}}



http://localhost:9200/company_base_info_2/_search?pretty
 
 
 {
 	"query": {
 		"bool": {
 			"must": [{
 				"match_all": {}
 			}]
 		}
 	},
 	"from": 0,
 	"size": 0,
 	"aggregations": {
 		"age": {
 			"aggregations": {
 				"COUNT(*)": {
 					"count": {
 						"field": "_index"
 					}
 				}
 			},
 			"terms": {
 				"field": "age",
 				"size": "1"
 			}
 		}
 	}
 }
 
 // good
{
  "query": {
    "bool": {
      "must": [
        { "match": { "age": "40" } }
      ],
      "must_not": [
        { "match": { "state": "ID" } }
      ]
    }
  }
}




// good
{
  "query": {
    "bool": {
      "must": [
        {
          "match_all": { }
        }
      ]
    }
  }, 
  "from": 0, 
  "size": 10000, 
  "aggregations": {
    "name": {
      "aggregations": {
        "SUM(name)": {
          "sum": {
            "field": "name"
          }
        }
      }, 
      "terms": {
        "field": "name", 
        "size": "10000"
      }
    }
  }
}


ElasticHD 1.3 修复细节处的BUG


ln -s /home/ok/api/storage/app/public/ /home/ok/api/public/





vue h5:
可以参考地址:
https://github.com/yrinleung/openshopping-vue