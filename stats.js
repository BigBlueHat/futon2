var http = require('http');

http.get("http://localhost:5984/_stats", function(res) {
  console.log("Got response: " + res.statusCode);
  var raw_data = "";
  res.on('data', function (chunk) {
    raw_data += chunk;
  });

  res.on('end', function () {
    data = JSON.parse(raw_data);
    stats = [];

    for (section in data) {
      var section_info = { name: section, subsections: [] };

      for( subsection in data[section]) {
        var subsection_obj = data[section][subsection]
        var subsection_info = {  
                            name: subsection,
                            description: subsection_obj.description,
                            current: subsection_obj.current,
                            sum: subsection_obj.sum,
                            mean: subsection_obj.mean,
                            stddev: subsection_obj.stddev,
                            min: subsection_obj.min,
                            max: subsection_obj.max
                        };

        //console.log(subsection_info)
        section_info.subsections.push(subsection_info);
      }
      stats.push(section_info);
    }

    console.log(stats[0]);
  });

}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
  /*  if (hack_counter === 1) {
        var td = 0;
        nv.addGraph(function() {  
          var chart = nv.models.discreteBarChart()
              .x(function(d) { return d.label })
              .y(function(d) { return d.value })
              .rotateLabels(-45)
              //.staggerLabels(true)
              //.staggerLabels(historicalBarChart[0].values.length > 8)
              .tooltips(false)
              .showValues(true)

          console.log(testdata);
          historicalBarChart = [ { key: "Couch Stuff", values: testdata}]
          d3.select('#test1')
              .datum(historicalBarChart)
            .transition().duration(500)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });
      }*/


