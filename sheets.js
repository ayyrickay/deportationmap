var Sheets = function (opts) {
    const key = opts.key
    const query = opts.query
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const targetUrl = 'https://spreadsheets.google.com/tq?callback=test&key=' + key
    let url = proxyUrl + targetUrl
    if (query) {
        url += '&tq=' + query
    }
    //alert(url)


    this.getData = (callback) => {
        fetch(url)
          .then(blob => blob.text())
          .then(response => {
              response = convertToJSON(response)
              callback(response)
              //console.log(response)
          })
    }

    const convertToJSON = (response) => {
        // get rid of prefix: google.visualization.Query.setResponse(
        response = response.split('google.visualization.Query.setResponse(')[1]
        // get rid of trailing );
        response = response.substring(0, response.length - 2)
        response = JSON.parse(response)
        return simplifyData(response)
    }

    const simplifyData = jsonData => {
        const data = []
        const columns = jsonData.table.cols
        const records = jsonData.table.rows

        //add header row:
        const keys = []
        for (let i = 0; i < columns.length; i++) {
            let cell = columns[i]
            if (cell && cell.label !== '') {
                keys.push(cell.label.toLowerCase().replace(/[&\/\\#,+\s+()$~%.'":*?<>{}]/g,'_'))
            }
        }

        //add data rows:
        records.forEach(record => {
            const row = {}
            const cells = record.c
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                row[keys[i]] = cells[i] ? cells[i].v : ''
            }
            data.push(row)
        })
        return {
            headers: keys,
            records: data
        }
    }
};
