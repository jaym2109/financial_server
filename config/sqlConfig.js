const viewpoint = {
  server: "JAM-APP-002.jamacdonald.com",
  database: "Viewpoint",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

const spruce = {
  server: "WOL-APP-001.jamacdonald.com",
  database: "SpruceDotNet",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

const dynamicsGP = {
  server: "JAM-SQL-001.jamacdonald.com",
  database: "GPPRD",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  }
};

module.exports = { viewpoint, spruce, dynamicsGP };
