var scrolly = d3.select("#scrolly__section");
var chart = scrolly.select(".scrolly__chart");
var content = scrolly.select(".scrolly__content");
var step = content.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 1);
    step.style("height", stepH + "px");

    // chart - 80%
    var figureHeight = window.innerHeight * 0.8;
    // step above the chart
    var figureMarginTop = window.innerHeight - figureHeight;

    chart
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    const textblock = step.select(".text-block");

    // add color to current step only
    textblock.classed("is-active", function (d, i) {
        return i === response.index;
    });

    url = d3.select(".scrolly__chart iframe").attr("src").slice(0, -1) + response.index;
    d3.select(".scrolly__chart iframe").attr("src", url);
}

function setupStickyfill() {
    d3.selectAll(".sticky").each(function () {
        Stickyfill.add(this);
    });
}

function init() {
    setupStickyfill();
    handleResize();
    scroller
        .setup({
            step: "#scrolly__section .scrolly__content .step",
            progress: true,
            offset: 0.7,
            debug: false,
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", handleResize);
}

init();
