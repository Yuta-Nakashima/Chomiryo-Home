#include <WioCellLibforArduino.h>

#define LIGHT (WIO_A4)
// #define LIGHT (WIO_A6)

#define APN               "soracom.io"
#define USERNAME          "sora"
#define PASSWORD          "sora"

#define WEBURL            "http://beam.soracom.io:8888/choumiryou"
#define INTERVAL          (1000)

boolean setup_flag = false;
double percentage = 0;
double before = 0;
int seco = 0;
int mino = 04;
int hour = 16;
WioCellular Wio;

void setup() {
  delay(200);

  // デバッグ用シリアル初期化
  SerialUSB.begin(115200);
  SerialUSB.println("");
  SerialUSB.println("--- START ---");

  SerialUSB.println("### I/O Initialize.");
  Wio.Init();

  SerialUSB.println("### Power supply ON.");
  Wio.PowerSupplyCellular(true);
  Wio.PowerSupplyGrove(true);
  delay(1000);

  SerialUSB.println("### Turn on or reset.");
  if (!Wio.TurnOnOrReset()) {
    SerialUSB.println("### ERROR! ###");
    return;
  }

#ifdef ARDUINO_WIO_LTE_M1NB1_BG96
  SerialUSB.println("### SetSelectNetwork MANUAL_IMSI ###");
  Wio.SetSelectNetwork(WioCellular::SELECT_NETWORK_MODE_MANUAL_IMSI);
#endif

#ifdef ARDUINO_WIO_3G
  SerialUSB.println("### SetSelectNetwork AUTOMATIC ###");
  Wio.SetSelectNetwork(WioCellular::SELECT_NETWORK_MODE_AUTOMATIC);
#endif

  SerialUSB.println("### Connecting to \"" APN "\".");

  if (!Wio.Activate(APN, USERNAME, PASSWORD)) {
    SerialUSB.println("### APN SET ERROR! ###");
    return;
  }

  delay(500);
  pinMode(LIGHT, INPUT_ANALOG);
  SerialUSB.println("### Setup completed.");

  setup_flag = true;

}

void loop() {

  SerialUSB.println("### Wait.");
  delay(INTERVAL);

  if (setup_flag == false)
  {
    delay(5000);
    setup();
    return;
  }

  // 1秒毎にGrove 光 センサーの値をシリアルに出力
  // Wio LTE M1/NB1(BG96)のADCが12bitのため、0(暗い)〜662明るい)までの値が取得可能
  int sensorValue = analogRead(LIGHT);
  SerialUSB.print(sensorValue);
  SerialUSB.println("V");
  double Reciprocal = -(sensorValue - 662);
  SerialUSB.print(Reciprocal);
  SerialUSB.println("V");
  before = percentage;
  percentage = (Reciprocal * 1.2 / 662) * 100;

  if (percentage <= 0) {
    percentage = 0;
  }

  if (percentage >= 100) {
    percentage = 100;
  }

  SerialUSB.print(percentage);
  SerialUSB.println("%");

  if (before - percentage >= 4) {
    char data[500];
    int status;
    SerialUSB.println("### Post.");
    seco += 1;
    if (seco == 60) {
      mino++;
      seco = 0;
    }

    if (mino == 60) {
      hour++;
      mino = 0;
    }

    if (hour == 24) {
      hour = 0;
    }

    sprintf(data, "{\"nokori\":\"%d\", \"koushin\":\"2019/06/30 %d:%d:%d\",\"shiyou\":\"%d\"}", int(percentage), hour, mino, seco, int(before - percentage));

    SerialUSB.print("Post:");
    SerialUSB.print(data);
    SerialUSB.println("");

    if (Wio.HttpPost(WEBURL, data, &status)) {
      SerialUSB.print("Status:");
      SerialUSB.println(status);
    }

    if (percentage == 0) {

      sprintf(data, "{\"nokori\":\"%d\", \"koushin\":\"2019/06/30 %d:%d:%d\",\"shiyou\":\"%d\"}", int(percentage), hour, mino, seco, int(before - percentage));

      SerialUSB.print("Post:");
      SerialUSB.print(data);
      SerialUSB.println("");

    }

  }

}
