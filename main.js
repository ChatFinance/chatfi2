const fs = require("fs");
const path = require("path");
const cryptoHash = require("crypto-hashing");

fs.readFile(path.join(__dirname, "./data.txt"), (err, res) => {
  const arr = res
    .toString()
    .split("\n")
    .map((item) => item.split(","));

  const metadata = arr.map((item) => {
    const metadata = {
      image: `https://chatfi.s3.ap-southeast-1.amazonaws.com/images/${item[0]}.png`,
      name: `Chat-GPT Finance #${item[0]}`,
      tokenId: item[0],
      external_url: "https://twitter.com/ChatFi_AI",
      attributes: [
        {
          trait_type: "glasses",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[2]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "hat",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[3]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "facemask",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[4]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "mouth",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[5]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "earpros",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[6]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "hair",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[7]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "eyes",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[8]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "nose",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[9]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "eyebrow",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[10]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "beards",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[11]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "ears",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[12]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "body",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[13]))
              .toString("hex")
              .slice(0, 5),
        },
        {
          trait_type: "background",
          value:
            "0x" +
            cryptoHash("hash256", new Buffer(item[14]))
              .toString("hex")
              .slice(0, 5),
        },
      ],
    };
    return metadata;
  });

  for (let i = 0; i < metadata.length; i++) {
    fs.writeFileSync(
      path.join(__dirname, `./data/${metadata[i].tokenId}.json`),
      JSON.stringify(metadata[i], null, 2)
    );
  }

  console.log("Success!")
});
