// Use D3 to read in the JSON file
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
    // Extract necessary data
    const samples = data.samples;
    const metadata = data.metadata;

    // Create functions to generate visualizations and update them
    function createBarChart(sampleId) {
        // Write code to create the bar chart here
    }

    function createBubbleChart(sampleId) {
        // Write code to create the bubble chart here
    }

    function displayMetadata(sampleId) {
        // Write code to display metadata here
    }

    function updatePlots(sampleId) {
        createBarChart(sampleId);
        createBubbleChart(sampleId);
        displayMetadata(sampleId);
        // Additional code to update other plots if necessary
    }

    // Create dropdown menu and event listener to update plots
    const dropdown = d3.select("#dropdown");
    dropdown.selectAll("option")
        .data(samples.map(sample => sample.id))
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

    dropdown.on("change", function() {
        const selectedSample = dropdown.property("value");
        updatePlots(selectedSample);
    });

    // Initialize plots with the first sample
    const initialSampleId = samples[0].id;
    updatePlots(initialSampleId);
});
