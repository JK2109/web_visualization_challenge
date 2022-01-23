
async function optionChanged(value) {
    const response = await fetch("./samples.json");
    const data = await response.json();
    // console.log(data.names);
    // console.log(data.metadata);
    // console.log(data.samples[0]);
    // console.log(data.samples[0].otu_ids);
    // console.log(data.samples[0].sample_values);

console.log(data)
    
    let i = data.names.indexOf((value));
  


    //----------------------------------------------------------------------------------------------//
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.    
    let chartData1 = {
        x: data.samples[i].sample_values.slice(0,10).reverse(),
        y: data.samples[i].otu_ids.slice(0,10).map(ids => `OTU ${ids}`).reverse(),
        text : data.samples[i].otu_labels.slice(0,10).reverse(),
        name: "OTU",
        type: "bar",
        orientation: "h"
    };

    let traceData1=[chartData1];

    // apply the title to the layout
    let layout1 = {
    title: "Top 10 OTUs found in individuals - Bar Chart",
    };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", traceData1 ,layout1);

    //------------------------------------------------------------------------------------//
    //Create a bubble chart that displays each sample

    let chartData2 = {
        x: data.samples[i].otu_ids,
        y: data.samples[i].sample_values,
        mode: 'markers',
        marker: {
            size: data.samples[i].sample_values,
            color: data.samples[i].otu_ids,
        }

    }
    let traceData2=[chartData2];

    let layout2 = {
        title: "OTUs found in individuals - Bubble Chart",
    };

    Plotly.newPlot('bubble', traceData2, layout2);

    //----------------------------------------------------------------------------------------------//
    //Creating an option for the dropdown.
   
    for (let j = 0; j < data.names.length; j++) {
        const newOption = document.createElement("option")
        const attribute = document.createAttribute('value');
        newOption.textContent = data.names[j];
        attribute.textContent = data.names[j];
        
        document.querySelector("#selDataset").append(newOption);
        newOption.setAttributeNode(attribute);
    
    }   
    
    //----------------------------------------------------------------------------------------------//

    
    //Display each key-value pair from the metadata JSON object somewhere on the page.
    // console.log(Object.entries(data.metadata))
    let demoInfo = document.querySelector("#sample-metadata")
    console.log(demoInfo)
        
    
    for (const [key, value] of Object.entries(data.metadata[i])) {
        const newP = document.createElement("P");
        newP.textContent = key +": "+ value;
        console.log(newP)
        demoInfo.append(newP);
    }
    // clear the text content in demoinfo
    document.querySelector("#selDataset").addEventListener("change", event => {  
        demoInfo.textContent = "";
    })
    // -------------------------------------------------------------------------------------------//
    
    //Update all of the plots any time that a new sample is selected
    var chartData3 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: data.metadata[i].wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br> Scrubs per week" },
            type: "indicator",
            mode: "gauge+number",
            text: [],
            gauge: {
                axis :{ 
                    range: [0, 9],
                    visible: true,
                    tickmode: "array",
                    tickvals: ["1","2","3","4","5","6","7","8","9"],
                    
                },
                steps: [
                    { range: [0, 1], color: "#f7fcfd" }, 
                    { range: [1, 2], color: "#e5f5f9" },
                    { range: [2, 3], color: "#ccece6" },
                    { range: [3, 4], color: "#99d8c9" },
                    { range: [4, 5], color: "#66c2a4" },
                    { range: [5, 6], color: "#41ae76" },
                    { range: [6, 7], color: "#238b45" },
                    { range: [7, 8], color: "#006d2c" },
                    { range: [8, 9], color: "#00441b" },
                    

                ],
                bar: { color: "black", thickness : 1 },
            }
            
        }
    ];



    var layout = { width: 600, height: 500, margin: { t: 21, b: 0 }, };
    Plotly.newPlot('gauge', chartData3, layout); 

}


//Setup with the Initial Value
optionChanged('940');


