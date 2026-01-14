// src/contracts/VehicleHistory.js

export const CONTRACT_ADDRESS = "0x071CbB89f670795505eF299649979d247B2fA2F1";

export const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_serviceType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_date",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_mileage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addService",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "vehicleVIN",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			}
		],
		"name": "registerVehicle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "vehicleVIN",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "serviceId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "serviceType",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "mileage",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "addedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ServiceAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "vehicleVIN",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "VehicleRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			}
		],
		"name": "getLatestService",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "vehicleVIN",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serviceType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "mileage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "cost",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "addedBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct VehicleHistory.Service",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_serviceId",
				"type": "uint256"
			}
		],
		"name": "getService",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "vehicleVIN",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serviceType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "mileage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "cost",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "addedBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct VehicleHistory.Service",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			}
		],
		"name": "getServiceCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			}
		],
		"name": "getTotalCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			}
		],
		"name": "getVehicleHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "vehicleVIN",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "serviceType",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "mileage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "cost",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "addedBy",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct VehicleHistory.Service[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_vin",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_newMileage",
				"type": "uint256"
			}
		],
		"name": "verifyMileage",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];