// effects -> [effect_on_atp, effect_on_glucose, effect_on_purivat, effect_on_nadh]
const steps = [
    {
        "t": 0,
        "effects": [-1,-1,0,0]
    },
    {
        "t": 1,
        "effects": [-1,0,0,0]
    },
    {
        "t": 2,
        "effects": [0,0,0,2]
    },
    {
        "t": 3,
        "effects": [2,0,0,0]
    },
    {
        "t": 4,
        "effects": [2,0,2,0]
    }
]

const chart = new Chart("myChart", {
  type: "line",
  data: {
    datasets: [{
      borderColor: "red",
      label: "ATP",
      fill: false
    },{
      borderColor: "green",
      label: "Glikoz",
      fill: false
    },{
      borderColor: "blue",
      label: "Pürivat",
      fill: false
    },{
      borderColor: "black",
      label: "NADH",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

let stop = false;

let atp = 2;
let glucose = 1;
let purivat = 0;
let nadh = 0;

let total_time_step = glucose * 5;

function updateChart(t) {
  chart.data.labels.push(t);
  chart.data.datasets[0].data.push(atp);
  chart.data.datasets[1].data.push(glucose);
  chart.data.datasets[2].data.push(purivat);
  chart.data.datasets[3].data.push(nadh);
  chart.update();
}

function next_step(t) {
    let step = t % steps.length;
    if(t === 0 && glucose <= 0){stop = true; return;} 
    if(t === 0 && atp < 2){stop = true; return;} 

    const n_atp = atp + steps[step]["effects"][0];
    const n_glucose = glucose + steps[step]["effects"][1];
    const n_purivat = purivat + steps[step]["effects"][2];
    const n_nadh2 = nadh + steps[step]["effects"][3];

    if(n_atp < 0 || n_glucose < 0 || n_purivat < 0 || n_nadh2 < 0)
            return;

    atp = n_atp;
    glucose = n_glucose;
    purivat = n_purivat;
    nadh = n_nadh2;
}

for(let i = 0;i < total_time_step;i++){
    if(stop) break;
    next_step(i);
    updateChart(i);
}
