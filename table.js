const sheets = new Sheets({
    key: '1ct6USPp-JQQiDQhFlDQYzftwcR9OYNzPiqskQa8v36w'
});

sheets.getData(data => {
    //loop through records and output to the screen:
    console.log(data)
    let num = 1
    data.records.forEach(record => {
        const tr = document.createElement('tr')
        let td = document.createElement('td')
        td.innerHTML = num
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.departures
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.facility_name
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.facility_type
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.per_diem_rate
        tr.appendChild(td)

        td = document.createElement('td')
        td.innerHTML = record.state
        tr.appendChild(td)
        //
        document.querySelector('#content tbody').appendChild(tr)
        ++num
    })
});
