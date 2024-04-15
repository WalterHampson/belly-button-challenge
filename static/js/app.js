let samples;
let metadata;
// Use D3 to read in the JSON file
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
    // Extract necessary data
    samples = data.samples;
    metadata = data.metadata;

    // Create dropdown menu and event listener to update plots
    // Populate dropdown menu with sample IDs
    const dropdown = d3.select("#selDataset");
    dropdown.selectAll("option")
        .data(samples.map(sample => sample.id))
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

    // dropdown.on("change", function () {
    //     const selectedSample = dropdown.property("value");
    //     updatePlots(selectedSample);
    // });

    // Initialize plots with the first sample
    const initialSampleId = samples[0].id;
    optionChanged(initialSampleId);
});


// Create functions to generate visualizations and update them
function createBarChart(sampleId) {
    const sample = samples.find(sample => sample.id === sampleId);
    const top10SampleValues = sample.sample_values.slice(0, 10);
    const top10OTUIDs = sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    const top10OTULabels = sample.otu_labels.slice(0, 10);

    const data = [{
        x: top10SampleValues,
        y: top10OTUIDs,
        text: top10OTULabels,
        type: 'bar',
        orientation: 'h'
    }];

    const layout = {
        title: 'Top 10 OTUs'
    };

    Plotly.newPlot('bar', data, layout);
}

function createBubbleChart(sampleId) {
    const sample = samples.find(sample => sample.id === sampleId);

    const trace = {
        x: sample.otu_ids,
        y: sample.sample_values,
        mode: 'markers',
        marker: {
            size: sample.sample_values,
            color: sample.otu_ids
        },
        text: sample.otu_labels
    };
    const layout = {
        title: 'OTU Bubble Chart',
        xaxis: {
            title: 'OTU ID'
        },
        yaxis: {
            title: 'Sample Value'
        }
    };
    Plotly.newPlot('bubble', [trace], layout);
}

function displayMetadata(sampleId) {
    const metadataRecord = metadata.find(record => record.id === parseInt(sampleId));
    const metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html("");
    Object.entries(metadataRecord).forEach(([key, value]) => {
        metadataDiv.append("p").text(`${key}: ${value}`);
    });
}

function optionChanged(newSampleId) {
    createBarChart(newSampleId);
    createBubbleChart(newSampleId);
    displayMetadata(newSampleId);
}