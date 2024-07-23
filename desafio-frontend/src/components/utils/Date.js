import React from 'react';


const DataFormat = ({ data }) => {

    let dataf = data.split("T")[0]
    if (typeof dataf != 'undefined') {
        
        let day = dataf.split("-")[2]
        let month = dataf.split("-")[1]
        let year = dataf.split("-")[0]
        let dataFormat = day + '/' + month + '/' + year
        return <span>{dataFormat}</span>;

    }


    
};

export default DataFormat;
