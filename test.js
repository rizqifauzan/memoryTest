const {By,Key,Builder} = require("selenium-webdriver");
const cliProgress = require('cli-progress');

require("chromedriver");

let driver;
let activeIndexList;




function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


async function example(){
 
       var searchString = "Automation testing with Selenium";
 
       //To wait for browser to build and launch properly
        driver = await new Builder().forBrowser("chrome").build();

 
        //To fetch https://humanbenchmark.com/tests/memory from the browser with our code.
        await driver.get("https://humanbenchmark.com/tests/memory");
        
        await driver.findElement(By.xpath("//button[.='Start']")).click();
            play();
     
}

function playGame() {
    play();
    return true;
    
}

async function cek(index) {
    var classBox = await (await (driver.findElements(By.xpath("//div[@class='anim-slide-fade-in']/div/div/div/div/div"))))[index].getAttribute("class");
    if (classBox.includes("active")) {
        activeIndexList.push(index);
    }
}

async function play(){
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    var isLoop = true;
        //wait until active 
        do {
            try {
                var classBoxa =  await driver.findElement(By.xpath("//div[contains(@class, 'active ')]")).getAttribute("class");
                if (classBoxa.includes("active")) {
                    isLoop = false;
                }
            } catch (error) {
                //console.log("mencoba lagi . . . .");
            }
            
        } while (isLoop);

        boxs =  await driver.findElements(By.xpath("//div[@class='anim-slide-fade-in']/div/div/div/div/div"));
        jumlahBox =  boxs.length;

        var level = await (await driver.findElement(By.xpath("//span/span[2]"))).getText(); 
        
        console.log("");
        console.log(" -------------------");
        console.log("    Level "+ level);
        console.log(" ===================");
        console.log(" jumlah box : " + jumlahBox );

        activeIndexList = [];

        for (let index = 0; index < jumlahBox; index++) {
             cek(index);
        }

        // Wait active class 0
        do {
            jumlahActiveBox =  await (await driver.findElements(By.xpath("//div[contains(@class, 'active ')]"))).length;
        } while (jumlahActiveBox>2);
        console.log(" white box  : " + activeIndexList.length);

        bar1.start(activeIndexList.length, 0);
        
        sleep(2000);
        for (let index = 0; index < activeIndexList.length; index++) {
            sleep(100);
            await boxs[activeIndexList[index]].click();
            bar1.update(index+1);
		}
        bar1.stop();

        jumlahActiveBox =  await (await driver.findElements(By.xpath("//div[contains(@class, 'active ')]"))).length;
        // Wait active class 0
        do {
            jumlahActiveBox =  await (await driver.findElements(By.xpath("//div[contains(@class, 'active ')]"))).length;
        } while (jumlahActiveBox>2);
        
        play();

}

example()
//play();