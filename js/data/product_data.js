window.productData = {
    'bar-bending-models': [
        {
            model: "SBB52",
            name: "SBB52",
            image: "./Assets/Product Images/bender.png",
            
            description: "High-precision bending with programmable angles for complex shapes.",
            specs: [
                { icon: "fa-solid fa-rotate", text: "Bend Dia: Up to 42mm" },
                { icon: "fa-solid fa-microchip", text: "Control: Pin / Foot Pedal" },
                { icon: "fa-solid fa-shield-halved", text: "Features: Save Angle Presets, Emergency Stop" }
            ],
            compare: { model: "SBB52", category: "bar-benders", "bend-dia": "Up to 42mm", control: "Pin / Foot Pedal", features: "Save Angle Presets, Emergency Stop" },
            actions: [{ type: 'cart', name: 'SBB52' }]
        },
        {
            model: "SBB42", 
            name: "SBB42",
            image: "./Assets/Product Images/sbb-42.png",
            description: "Reliable bending for stirrups and standard angles with pin-type control.",
            specs: [
                { icon: "fa-solid fa-rotate", text: "Bend Dia: 6mm - 32mm" },
                { icon: "fa-solid fa-microchip", text: "Control: Pin / Foot Pedal" },
                { icon: "fa-solid fa-shield-halved", text: "Features: Save Angle Presets, Emergency Stop" }
            ],
            compare: { model: "SBB42", category: "bar-benders", "bend-dia": "6mm - 32mm", control: "Pin / Foot Pedal", features: "Save Angle Presets, Emergency Stop" },
            actions: [{ type: 'cart', name: 'SBB42' }]
        }
        
    ],
    'bar-cutting-models': [
        {
            model: "SBC52 Heavy Duty",
            name: "SBC52 Heavy Duty",
            image: "./Assets/Product Images/sbc.png",
            description: "Engineered for infrastructure projects requiring high-volume processing.",
            specs: [
                { icon: "fa-solid fa-ruler-combined", text: "Capacity: Up to 42mm TMT" },
                { icon: "fa-solid fa-bolt", text: "Power: 4 KW Motor" },
                { icon: "fa-solid fa-gear", text: "Gearbox: Reinforced Oil Bath" }
            ],
            compare: { model: "SBC52 Heavy Duty", category: "bar-cutters", capacity: "Up to 42mm TMT", power: "4 KW Motor", gearbox: "Reinforced Oil Bath" },
            actions: [{ type: 'cart', name: 'SBC52 Heavy Duty' }]
        },
        {
            model: "SBC42 Standard",
            name: "SBC42 Standard",
            image: "./Assets/Product Images/sbc.png",
            description: "The industry standard for residential and commercial construction sites.",
            specs: [
                { icon: "fa-solid fa-ruler-combined", text: "Capacity: Up to 32mm TMT" },
                { icon: "fa-solid fa-bolt", text: "Power: 3 KW Motor" },
                { icon: "fa-solid fa-gauge-high", text: "Speed: 32 times/min" }
            ],
            compare: { model: "SBC42 Standard", category: "bar-cutters", capacity: "Up to 32mm TMT", power: "3 KW Motor", speed: "32 times/min" },
            actions: [{ type: 'cart', name: 'SBC42 Standard' }]
        }
    ],
    'concrete-mixer-models': [
        {
            model: "SCME-220L Electric",
            name: "SCME-220L (Electric)",
            image: "./Assets/Product Images/scme-220.png",
            description: "Standard 1-bag mixer ideal for small jobs and indoor sites with electrical access.",
            specs: [
                { icon: "fa-solid fa-water-ladder", text: "Capacity: 220 Litres" },
                { icon: "fa-solid fa-bolt-lightning", text: "Power: 3 HP Electric Motor" },
                { icon: "fa-solid fa-truck-fast", text: "Mobility: Towable on site" },
                { icon: "fa-solid fa-plug", text: "Input Voltage: 220V" }
            ],
            compare: { model: "SCME-220L Electric", category: "concrete-mixers", capacity: "220 Litres", power: "3 HP Electric Motor", mobility: "Towable on site" },
            actions: [{ type: 'cart', name: 'SCME-220L Electric' }]
        },
        {
            model: "SCME-350L Electric",
            name: "SCME-350L (Electric)",
            image: "./Assets/Product Images/scme-350.png",
            description: "High-capacity 2-bag mixer for medium-sized projects requiring higher output.",
            specs: [
                { icon: "fa-solid fa-water-ladder", text: "Capacity: 350 Litres" },
                { icon: "fa-solid fa-bolt-lightning", text: "Power: 5 HP Electric Motor" },
                { icon: "fa-solid fa-truck-fast", text: "Mobility: Heavy Duty Chassis" },
                { icon: "fa-solid fa-plug", text: "Input Voltage: 220V" }
            ],
            compare: { model: "SCME-350L Electric", category: "concrete-mixers", capacity: "350 Litres", power: "5 HP Electric Motor", mobility: "Heavy Duty Chassis" },
            actions: [{ type: 'cart', name: 'SCME-350L Electric' }]
        },
    ],
    'concrete-pouring-buckets': [
        {
            model: "SCCB25",
            name: "SCCB25",
            image: "./Assets/Product Images/scpb.png",
            description: "Heavy duty concrete pouring bucket for crane operation.",
            specs: [
                { icon: "fa-solid fa-bucket", text: "Capacity: 0.25 Cu.m" },
                { icon: "fa-solid fa-arrow-down", text: "Type: Lever/Gear or Screw" },
                { icon: "fa-solid fa-weight-hanging", text: "Operation: Crane Lift" }
            ],
            compare: { model: "SCCB25", category: "concrete-buckets", capacity: "0.25 Cu.m", type: "Lever/Gear or Screw", operation: "Crane Lift" },
            actions: [{ type: 'cart', name: 'SCCB25 Bucket' }]
        },
        {
            model: "SCCB50",
            name: "SCCB50",
            image: "./Assets/Product Images/scpb.png",
            description: "Large capacity concrete pouring bucket for efficient placement.",
            specs: [
                { icon: "fa-solid fa-bucket", text: "Capacity: 0.5 Cu.m" },
                { icon: "fa-solid fa-arrow-down", text: "Type: Lever/Gear or Screw" },
                { icon: "fa-solid fa-weight-hanging", text: "Operation: Crane Lift" }
            ],
            compare: { model: "SCCB50", category: "concrete-buckets", capacity: "0.5 Cu.m", type: "Center Discharge", operation: "Crane Lift" },
            actions: [{ type: 'cart', name: 'SCCB50 Bucket' }]
        }
    ],
    'dewatering-pump': [
        {
            model: "2 Inch Dewatering Pump",
            name: "2 Inch Dewatering Pump",
            image: "./Assets/Product Images/sdwp2.png",
            description: "Versatile pump for general dewatering tasks.",
            specs: [
                { icon: "fa-solid fa-arrow-up-from-water-pump", text: "Discharge Diameter: 2 Inch" },
                { icon: "fa-solid fa-arrows-up-down", text: "Max Lift: 12 Mtr" },
                { icon: "fa-solid fa-tachometer-alt", text: "Capacity: 600 Ltr/min" }
            ],
            compare: { model: "2 Inch Dewatering Pump", category: "dewatering-pumps", "discharge-diameter": "2 Inch", "max-lift": "12 Mtr", capacity: "600 Ltr/min" },
            actions: [{ type: 'cart', name: '2 Inch Dewatering Pump' }]
        },
        {
            model: "3 Inch Dewatering Pump",
            name: "3 Inch Dewatering Pump",
            image: "./Assets/Product Images/sdwp3.png",
            description: "Higher capacity pump for faster water removal.",
            specs: [
                { icon: "fa-solid fa-arrow-up-from-water-pump", text: "Discharge Diameter: 3 Inch" },
                { icon: "fa-solid fa-arrows-up-down", text: "Max Lift: 12 Mtr" },
                { icon: "fa-solid fa-tachometer-alt", text: "Capacity: 800 Ltr/min" }
            ],
            compare: { model: "3 Inch Dewatering Pump", category: "dewatering-pumps", "discharge-diameter": "3 Inch", "max-lift": "12 Mtr", capacity: "800 Ltr/min" },
            actions: [{ type: 'cart', name: '3 Inch Dewatering Pump' }]
        }
    ],
    'handy-vibration-models': {
        standard: [
            {
                model: "SHM 800",
                name: "Handy Vibrator Motor 800W",
                image: "./Assets/Product Images/shm800.png",
                description: "Compact 800W motor for light duty tasks.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 800 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 4200 rpm" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 220V" }
                ],
                compare: { model: "SHM 800", category: "handy-vibrators", power: "800 W", speed: "4200 rpm", voltage: "220V" },
                actions: [{ type: 'cart', name: 'Handy Vibrator Motor 800W' }]
            },
            {
                model: "SHM 1200",
                name: "Handy Vibrator Motor 1200W",
                image: "./Assets/Product Images/shm1200.png",
                description: "Versatile 1200W motor for general concrete vibration.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 1200 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 4300 rpm" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 220V" }
                ],
                compare: { model: "SHM 1200", category: "handy-vibrators", power: "1200 W", speed: "4300 rpm", voltage: "220V" },
                actions: [{ type: 'cart', name: 'Handy Vibrator Motor 1200W' }]
            },
            {
                model: "SHM 1600",
                name: "Handy Vibrator Motor 1600W",
                image: "./Assets/Product Images/shm1600.png",
                description: "High-performance 1600W motor for demanding tasks.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 1600 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 4600 rpm" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 220V" }
                ],
                compare: { model: "SHM 1600", category: "handy-vibrators", power: "1600 W", speed: "4600 rpm", voltage: "220V" },
                actions: [{ type: 'cart', name: 'Handy Vibrator Motor 1600W' }]
            }
        ],
        highFrequency: [
            {
                model: "SHHM Hand Held",
                name: "High Frequency Hand-Held Vibrator",
                image: "./Assets/Product Images/hand-held.png",
                description: "Powerful hand-held motor for high frequency applications.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 2300 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 16000 rpm" },
                    { icon: "fa-solid fa-weight-hanging", text: "Weight: 5.8 kg" }
                ],
                compare: { model: "SHHM Hand Held", category: "handy-vibrators", power: "2300 W", speed: "16000 rpm", weight: "5.8 kg" },
                actions: [{ type: 'cart', name: 'High Frequency Hand Held Motor' }]
            }
        ]
    },
    'high-frequency-converter-models': [
        {
            model: "SHFC 35",
            name: "High Frequency Converter SHFC 35",
            image: "./Assets/Product Images/shfc35.png",
            description: "Compact converter designed for efficiency.",
            specs: [
                { icon: "fa-solid fa-plug", text: "Outlets: 2 Outlet" },
                { icon: "fa-solid fa-bolt", text: "Type: High Frequency" },
                { icon: "fa-solid fa-weight-hanging", text: "Input Voltage: 415V"},
                { icon: "fa-solid fa-weight-hanging", text: "Output Voltage: 42V"}
            ],
            compare: { model: "SHFC 35", category: "high-frequency-converter", outlets: "2 Outlet", type: "Converter" },
            actions: [{ type: 'cart', name: 'SHFC 35 Converter' }]
        },
        {
            model: "SHFC90P",
            name: "High Frequency Converter SHFC90P",
            image: "./Assets/Product Images/shfc90.png",
            description: "Heavy-duty converter for multiple connections.",
            specs: [
                { icon: "fa-solid fa-plug", text: "Outlets: 4 Outlet" },
                { icon: "fa-solid fa-bolt", text: "Type: High Frequency" },
                { icon: "fa-solid fa-weight-hanging", text: "Input Voltage: 415V"},
                { icon: "fa-solid fa-weight-hanging", text: "Output Voltage: 42V"}
            ],
            compare: { model: "SHFC90P", category: "high-frequency-converter", outlets: "4 Outlet", type: "Converter" },
            actions: [{ type: 'cart', name: 'SHFC90P Converter' }]
        }
    ],
    'high-frequency-poker-models': {
        standalone: [
            {
                model: "40IV Poker",
                name: "40IV High Frequency Poker",
                image: "./Assets/Product Images/shiv40.png",
                description: "Standalone poker with inbuilt frequency converter.",
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Inbuilt Converter" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 220V (Single Phase)" }
                ],
                compare: { model: "40IV Poker", category: "high-frequency-poker", diameter: "40mm", type: "Inbuilt Converter", voltage: "220V" },
                actions: [{ type: 'cart', name: '40IV High Frequency Poker' }]
            },
            {
                model: "60IV Poker",
                name: "60IV High Frequency Poker",
                image: "./Assets/Product Images/shiv60.png",
                description: "High performance 60mm poker with inbuilt converter.",
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 60mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Inbuilt Converter" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 220V (Single Phase)" }
                ],
                compare: { model: "60IV Poker", category: "high-frequency-poker", diameter: "60mm", type: "Inbuilt Converter", voltage: "220V" },
                actions: [{ type: 'cart', name: '60IV High Frequency Poker' }]
            }
        ],
        compatible: [
            {
                model: "SHFN 60 (5Mtr)",
                name: "SHFN 60 - 5Mtr Hose",
                image: "./Assets/Product Images/shfn60_5m.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 58mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Hose Length: 5 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Voltage: 42V (200Hz)" },
                    { icon: "fa-solid fa-wave-square", text: "Vibration: 12000 RPM" }
                ],
                compare: { model: "SHFN 60 (5Mtr)", category: "high-frequency-poker", diameter: "58mm", length: "5 Meters", voltage: "42V", frequency: "200Hz" },
                actions: [{ type: 'cart', name: 'SHFN 60 (5Mtr)' }]
            },
            {
                model: "SHFN 60 (12Mtr)",
                name: "SHFN 60 - 12Mtr Hose",
                image: "./Assets/Product Images/shfn60_12m.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 58mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Hose Length: 12 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Voltage: 42V (200Hz)" },
                    { icon: "fa-solid fa-wave-square", text: "Vibration: 12000 RPM" }
                ],
                compare: { model: "SHFN 60 (12Mtr)", category: "high-frequency-poker", diameter: "58mm", length: "12 Meters", voltage: "42V", frequency: "200Hz" },
                actions: [{ type: 'cart', name: 'SHFN 60 (12Mtr)' }]
            },
            {
                model: "40MM Needle 5Mtr",
                name: "40MM Needle - 5Mtr Hose",
                image: "./Assets/Product Images/shfn40_5m.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Hose Length: 5 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Voltage: 42V (200Hz)" },
                    { icon: "fa-solid fa-wave-square", text: "Vibration: 12000 RPM" }
                ],
                compare: { model: "40MM Needle 5Mtr", category: "high-frequency-poker", diameter: "40mm", length: "5 Meters", voltage: "42V", frequency: "200Hz" },
                actions: [{ type: 'cart', name: '40MM Needle 5Mtr' }]
            },
            {
                model: "40MM Needle 12Mtr",
                name: "40MM Needle - 12Mtr Hose",
                image: "./Assets/Product Images/shfn40_12m.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Hose Length: 12 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Voltage: 42V (200Hz)" },
                    { icon: "fa-solid fa-wave-square", text: "Vibration: 12000 RPM" }
                ],
                compare: { model: "40MM Needle 12Mtr", category: "high-frequency-poker", diameter: "40mm", length: "12 Meters", voltage: "42V", frequency: "200Hz" },
                actions: [{ type: 'cart', name: '40MM Needle 12Mtr' }]
            }
        ]
    },
    'industrial-cutting-tools': {
        grooveCutters: [
            {
                model: "Groove Cutter 125mm",
                name: "Groove Cutter (125mm)",
                image: "./Assets/Product Images/groove.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-ruler-vertical", text: "Depth: 125 mm" },
                    { icon: "fa-solid fa-horse-head", text: "Power: 5 HP" }
                ],
                compare: { model: "Groove Cutter 125mm", category: "industrial-cutters", "cutting-depth": "125 mm", power: "5 HP" },
                actions: [{ type: 'cart', name: 'Groove Cutter 125mm' }]
            }
        ],
        coreCutters: [
            {
                model: "Core Cutter SCC-90",
                name: "Core Cutter SCC-90",
                image: "./Assets/Product Images/scc-90.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-circle-dot", text: "Core Diameter: 90 mm" },
                    { icon: "fa-solid fa-bolt", text: "Power: 1350 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 1500 RPM" }
                ],
                compare: { model: "Core Cutter SCC-90", category: "industrial-cutters", "core-diameter": "90 mm", power: "1350 W" },
                actions: [{ type: 'cart', name: 'Core Cutter SCC-90' }]
            },
            {
                model: "Core Cutter SCC-160",
                name: "Core Cutter SCC-160",
                image: "./Assets/Product Images/scc-160.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-circle-dot", text: "Core Diameter: 160 mm" },
                    { icon: "fa-solid fa-bolt", text: "Power: 850 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 600 RPM" }
                ],
                compare: { model: "Core Cutter SCC-160", category: "industrial-cutters", "core-diameter": "160 mm", power: "850 W" },
                actions: [{ type: 'cart', name: 'Core Cutter SCC-160' }]
            },
            {
                model: "Core Cutter SCC-200",
                name: "Core Cutter SCC-200",
                image: "./Assets/Product Images/scc-200.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-circle-dot", text: "Core Diameter: 200 mm" },
                    { icon: "fa-solid fa-bolt", text: "Power: 3300 W" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 700 RPM" }
                ],
                compare: { model: "Core Cutter SCC-200", category: "industrial-cutters", "core-diameter": "200 mm", power: "3300 W" },
                actions: [{ type: 'cart', name: 'Core Cutter SCC-200' }]
            }
        ]
    },
    'mechanical-poker-models': {
        handyNeedles: [
            { 
                model: "Handy Needle 25mm (3M)", 
                name: "25MM Needle (3Mtr)", 
                image: "./Assets/Product Images/shp25_3m.png", 
                description: "Compact needle for handy vibrators.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 25mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Length: 3 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Handy Needle" }
                ],
                compare: { model: "Handy Needle 25mm (3M)", category: "mechanical-pokers", diameter: "25mm", length: "3 Meters", type: "Handy Needle" },
                actions: [{ type: 'cart', name: 'Handy Needle 25mm (3M)' }] 
            },
            { 
                model: "Handy Needle 25mm (6M)", 
                name: "25MM Needle (6Mtr)", 
                image: "./Assets/Product Images/shp25_6m.png", 
                description: "Extended reach needle for handy vibrators.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 25mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Length: 6 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Handy Needle" }
                ],
                compare: { model: "Handy Needle 25mm (6M)", category: "mechanical-pokers", diameter: "25mm", length: "6 Meters", type: "Handy Needle" },
                actions: [{ type: 'cart', name: 'Handy Needle 25mm (6M)' }] 
            },
            { 
                model: "Handy Needle 40mm (3M)", 
                name: "40MM Needle (3Mtr)", 
                image: "./Assets/Product Images/shp40_3m.png", 
                description: "Standard size needle for general use.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Length: 3 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Handy Needle" }
                ],
                compare: { model: "Handy Needle 40mm (3M)", category: "mechanical-pokers", diameter: "40mm", length: "3 Meters", type: "Handy Needle" },
                actions: [{ type: 'cart', name: 'Handy Needle 40mm (3M)' }] 
            },
            { 
                model: "Handy Needle 40mm (6M)", 
                name: "40MM Needle (6Mtr)", 
                image: "./Assets/Product Images/shp40_6m.png", 
                description: "Long hose needle for deep pours.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Length: 6 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Handy Needle" }
                ],
                compare: { model: "Handy Needle 40mm (6M)", category: "mechanical-pokers", diameter: "40mm", length: "6 Meters", type: "Handy Needle" },
                actions: [{ type: 'cart', name: 'Handy Needle 40mm (6M)' }] 
            },
            { 
                model: "Handy Needle 60mm (3M)", 
                name: "60MM Needle (3Mtr)", 
                image: "./Assets/Product Images/shp60_3m.png", 
                description: "Large diameter for heavy consolidation.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 60mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Length: 3 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Handy Needle" }
                ],
                compare: { model: "Handy Needle 60mm (3M)", category: "mechanical-pokers", diameter: "60mm", length: "3 Meters", type: "Handy Needle" },
                actions: [{ type: 'cart', name: 'Handy Needle 60mm (3M)' }] 
            },
            { 
                model: "Handy Needle 60mm (6M)", 
                name: "60MM Needle (6Mtr)", 
                image: "./Assets/Product Images/shp60_6m.png", 
                description: "Maximum reach and power.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 60mm" },
                    { icon: "fa-solid fa-ruler-vertical", text: "Length: 6 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Handy Needle" }
                ],
                compare: { model: "Handy Needle 60mm (6M)", category: "mechanical-pokers", diameter: "60mm", length: "6 Meters", type: "Handy Needle" },
                actions: [{ type: 'cart', name: 'Handy Needle 60mm (6M)' }] 
            }
        ],
        handHeldNeedles: [
            { 
                model: "Hand-Held Needle 25mm", 
                name: "25MM Needle", 
                image: "./Assets/Product Images/shhn25.png", 
                description: "Precision needle for high frequency motor.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 25mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Hand-Held" }
                ],
                compare: { model: "Hand-Held Needle 25mm", category: "mechanical-pokers", diameter: "25mm", type: "Hand-Held" },
                actions: [{ type: 'cart', name: 'Hand-Held Needle 25mm' }] 
            },
            { 
                model: "Hand-Held Needle 40mm", 
                name: "40MM Needle", 
                image: "./Assets/Product Images/shhn40.png", 
                description: "Versatile needle for high frequency motor.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Hand-Held" }
                ],
                compare: { model: "Hand-Held Needle 40mm", category: "mechanical-pokers", diameter: "40mm", type: "Hand-Held" },
                actions: [{ type: 'cart', name: 'Hand-Held Needle 40mm' }] 
            },
            { 
                model: "Hand-Held Needle 60mm", 
                name: "60MM Needle", 
                image: "./Assets/Product Images/shhn60.png", 
                description: "Heavy duty needle for high frequency motor.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 60mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Hand-Held" }
                ],
                compare: { model: "Hand-Held Needle 60mm", category: "mechanical-pokers", diameter: "60mm", type: "Hand-Held" },
                actions: [{ type: 'cart', name: 'Hand-Held Needle 60mm' }] 
            }
        ],
        mechanicalNeedles: [
            { 
                model: "Mechanical Needle 25mm", 
                name: "25MM Needles", 
                image: "./Assets/Product Images/smp25.png", 
                description: "Robust mechanical needle for standard vibrators.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 25mm" },
                    { icon: "fa-solid fa-bolt", text: "Hose Lengths: Avilable in 3/6 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Mechanical" }
                ],
                compare: { model: "Mechanical Needle 25mm", category: "mechanical-pokers", diameter: "25mm", type: "Mechanical" },
                actions: [{ type: 'cart', name: 'Mechanical Needle 25mm' }] 
            },
            { 
                model: "Mechanical Needle 40mm", 
                name: "40MM Needles", 
                image: "./Assets/Product Images/smp40.png", 
                description: "Standard mechanical needle for efficient compaction.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 40mm" },
                    { icon: "fa-solid fa-bolt", text: "Hose Lengths: Avilable in 3/6 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Mechanical" }
                ],
                compare: { model: "Mechanical Needle 40mm", category: "mechanical-pokers", diameter: "40mm", type: "Mechanical" },
                actions: [{ type: 'cart', name: 'Mechanical Needle 40mm' }] 
            },
            { 
                model: "Mechanical Needle 60mm", 
                name: "60MM Needles", 
                image: "./Assets/Product Images/smp60.png", 
                description: "High capacity mechanical needle for large jobs.", 
                specs: [
                    { icon: "fa-solid fa-ruler-horizontal", text: "Diameter: 60mm" },
                    { icon: "fa-solid fa-bolt", text: "Hose Lengths: Avilable in 3/6 Meters" },
                    { icon: "fa-solid fa-bolt", text: "Type: Mechanical" }
                ],
                compare: { model: "Mechanical Needle 60mm", category: "mechanical-pokers", diameter: "60mm", type: "Mechanical" },
                actions: [{ type: 'cart', name: 'Mechanical Needle 60mm' }] 
            }
        ]
    },
    'mini-lift-models': [
        {
            model: "Mini Lift 300Kg",
            name: "300Kg Mini Lift",
            image: "./Assets/Product Images/sml.png",
            description: "Versatile and compact, ideal for lifting materials on small to medium-sized sites.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Capacity: 300 Kg" },
                { icon: "fa-solid fa-arrows-up-down", text: "Lifting Height: 30 Mtr" },
                { icon: "fa-solid fa-rotate", text: "Rotation: 360 Degrees" },
                { icon: "fa-solid fa-ruler-vertical", text: "Rope: 08MM 30x6 FC" }
            ],
            compare: { model: "Mini Lift 300Kg", category: "mini-lifts", capacity: "300 Kg", height: "30 Mtr", rotation: "360 Degrees" },
            actions: [{ type: 'cart', name: 'Mini Lift 300Kg' }]
        },
        {
            model: "Mini Lift 500Kg",
            name: "500Kg Mini Lift",
            image: "./Assets/Product Images/sml-500.png",
            description: "Heavy-duty lifting capacity for demanding construction environments.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Capacity: 500 Kg" },
                { icon: "fa-solid fa-arrows-up-down", text: "Lifting Height: 30 Mtr" },
                { icon: "fa-solid fa-rotate", text: "Rotation: 360 Degrees" },
                { icon: "fa-solid fa-ruler-vertical", text: "Rope: 08MM 30x6 FC" }
            ],
            compare: { model: "Mini Lift 500Kg", category: "mini-lifts", capacity: "500 Kg", height: "30 Mtr", rotation: "360 Degrees" },
            actions: [{ type: 'cart', name: 'Mini Lift 500Kg' }]
        }
    ],
    'plate-compactor-models': [
        {
            model: "SFPC-5E",
            name: "SFPC-5E (Electric)",
            image: "./Assets/Product Images/sfpc-5e.png",
            description: "Ideal for walkways, small patches, and general light repair work. Forward travel only.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Operating Weight: 100 kg" },
                { icon: "fa-solid fa-gauge-high", text: "Centrifugal Force: 15 kN" },
                { icon: "fa-solid fa-gas-pump", text: "Powered By: 5 HP Electrical Motor" }
            ],
            compare: { model: "PC-80", category: "plate-compactors", weight: "80 kg", force: "15 kN", engine: "5.5 HP Petrol", feature: "-" },
            actions: [{ type: 'cart', name: 'PC-80' }]
        },
        {
            model: "SFPC-5D",
            name: "SFPC-5D (Diesel)",
            image: "./Assets/Product Images/sfpc-5d.png",
            description: "Higher compaction depth suitable for medium bases, gravel, and utility trenches.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Operating Weight: 150 kg" },
                { icon: "fa-solid fa-gauge-high", text: "Centrifugal Force: 25 kN" },
                { icon: "fa-solid fa-gas-pump", text: "Powered By: 5 HP Diesel Engine " }
            ],
            compare: { model: "PC-150", category: "plate-compactors", weight: "150 kg", force: "25 kN", engine: "8 HP Diesel", feature: "-" },
            actions: [{ type: 'cart', name: 'PC-150' }]
        },

        {
            model: "SRPC-3E",
            name: "SRPC-3E (Reversible Electric)",
            image: "./Assets/Product Images/srpc-3e.png",
            description: "Reversible control for maximum maneuverability in confined backfill areas and trenches.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Operating Weight: 250 kg" },
                { icon: "fa-solid fa-gauge-high", text: "Centrifugal Force: 35 kN" },
                { icon: "fa-solid fa-gas-pump", text: "Powered By: 5 HP Electrical Motor" }
            ],
            compare: { model: "PC-250R", category: "plate-compactors", weight: "250 kg", force: "35 kN", engine: "10 HP Petrol/Diesel", feature: "Reversible" },
            actions: [{ type: 'cart', name: 'PC-250R' }]
        },
        {
            model: "SRPC-3D",
            name: "SRPC-3D (Diesel Reversible)",
            image: "./Assets/Product Images/srpc-3d.png",
            description: "Hydraulic system for superior deep compaction and smooth directional changes.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Operating Weight: 300 kg" },
                { icon: "fa-solid fa-gauge-high", text: "Centrifugal Force: 40 kN" },
                { icon: "fa-solid fa-gas-pump", text: "Powered By: 5 HP Diesel Engine" }
            ],
            compare: { model: "PC-300H", category: "plate-compactors", weight: "300 kg", force: "40 kN", engine: "-", feature: "Hydraulic Reversible" },
            actions: [{ type: 'cart', name: 'PC-300H' }]
        },
        {
            model: "SFPC-2P",
            name: "SFPC-2P (Petrol)",
            image: "./Assets/Product Images/sfpc-2p.png",
            description: "Hydraulic system for superior deep compaction and smooth directional changes.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Operating Weight: 300 kg" },
                { icon: "fa-solid fa-gauge-high", text: "Centrifugal Force: 40 kN" },
                { icon: "fa-solid fa-gas-pump", text: "Powered By: 2 HP Petrol Engine" }
            ],
            compare: { model: "PC-300H", category: "plate-compactors", weight: "300 kg", force: "40 kN", engine: "-", feature: "Hydraulic Reversible" },
            actions: [{ type: 'cart', name: 'PC-300H' }]
        }
    ],
    'portable-bar-processing-models': {
        benders: [
            {
                model: "SPB25",
                name: "Portable Bender 25 - SPB25",
                image: "./Assets/Product Images/spb.png",
                description: "Lightweight bender for bars up to 25mm.",
                specs: [
                    { icon: "fa-solid fa-ruler-combined", text: "Capacity: 25mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Electric Portable" }],

                compare: { model: "SPB25", category: "portable-bar-equipment", type: "Portable Bender", capacity: "25mm", voltage: "220V/110V" },
                actions: [{ type: 'cart', name: 'SPB25 Portable Bender' }]
            },
            {
                model: "SPB32",
                name: "Portable Bender 32 - SPB32",
                image: "./Assets/Product Images/spb.png",
                description: "Powerful portable unit for bending bars up to 32mm.",
                specs: [
                    { icon: "fa-solid fa-ruler-combined", text: "Capacity: 32mm" },
                    { icon: "fa-solid fa-bolt", text: "Type: Electric Portable" }],

                compare: { model: "SPB32", category: "portable-bar-equipment", type: "Portable Bender", capacity: "32mm", voltage: "220V/110V" },
                actions: [{ type: 'cart', name: 'SPB32 Portable Bender' }]
            },
            {
                model: "SPS 32",
                name: "Bender & Straightener - SPS 32",
                image: "./Assets/Product Images/spb.png",
                description: "Dual function machine: Bends and Straightens bars up to 32mm.",
                specs: [
                    { icon: "fa-solid fa-ruler-combined", text: "Capacity: 32mm" },
                    { icon: "fa-solid fa-arrows-left-right", text: "Function: Bend & Straighten" }
                ],

                compare: { model: "SPS 32", category: "portable-bar-equipment", type: "Bender & Straightener", capacity: "32mm", voltage: "220V/110V", power: "600W" },
                actions: [{ type: 'cart', name: 'SPS 32 Bender & Straightener' }]
            }
        ],
        cutters: [
            {
                model: "SPC25",
                name: "Portable Cutter 25 - SPC25",
                image: "./Assets/Product Images/spc.png",
                description: "Fast and safe hydraulic cutting for bars up to 25mm.",
                specs: [{ icon: "fa-solid fa-ruler-combined", text: "Capacity: 25mm" }, { icon: "fa-solid fa-bolt", text: "Type: Hydraulic Cutter" }],
                compare: { model: "SPC25", category: "portable-bar-equipment", type: "Portable Cutter", capacity: "25mm", voltage: "220V/110V" },
                actions: [{ type: 'cart', name: 'SPC25 Portable Cutter' }]
            },
            {
                model: "SPC 32",
                name: "Portable Cutter 32 - SPC 32",
                image: "./Assets/Product Images/spc.png",
                description: "Heavy-duty portable cutter for bars up to 32mm.",
                specs: [{ icon: "fa-solid fa-ruler-combined", text: "Capacity: 32mm" }, { icon: "fa-solid fa-bolt", text: "Type: Hydraulic Cutter" }],
                compare: { model: "SPC 32", category: "portable-bar-equipment", type: "Portable Cutter", capacity: "32mm", voltage: "220V/110V" },
                actions: [{ type: 'cart', name: 'SPC 32 Portable Cutter' }]
            }
        ]
    },
    'power-trowel-models': [
        {
            model: "SPTP",
            name: "SPTP (Petrol Powered)",
            image: "./Assets/Others/logo.png",
            description: "",
            specs: [
                { icon: "fa-solid fa-tag", text: "Model: SPTP" },
                { icon: "fa-solid fa-ruler-horizontal", text: "Working Diameter: 1000 mm" },
                { icon: "fa-solid fa-gears", text: "Drive System: Honda Engine / Equivalent" },
                { icon: "fa-solid fa-fan", text: "No Of Blades: 4" },
                { icon: "fa-solid fa-horse-head", text: "Engine Power: 2Hp" },
                { icon: "fa-solid fa-weight-scale", text: "Weight: 70Kg" }
            ],
            compare: { model: "SPTP", category: "power-trowels", diameter: "1000 mm", blades: "4", power: "2Hp", weight: "70Kg" },
            actions: [{ type: 'cart', name: 'SPTP Petrol' }]
        },
        {
            model: "SPTE Electric",
            name: "SPTE (Electric Powered)",
            image: "./Assets/Others/logo.png",
            description: "",
            specs: [
                { icon: "fa-solid fa-tag", text: "Model: SPTE" },
                { icon: "fa-solid fa-ruler-horizontal", text: "Working Diameter: 1000 mm" },
                { icon: "fa-solid fa-bolt", text: "Drive System: Crompton motor / Equivalent" },
                { icon: "fa-solid fa-fan", text: "No Of Blades: 4" },
                { icon: "fa-solid fa-horse-head", text: "Motor Power: 3Hp" },
                { icon: "fa-solid fa-weight-scale", text: "Weight: 68Kg" }
            ],
            compare: { model: "SPTE Electric", category: "power-trowels", diameter: "1000 mm", blades: "4", power: "3Hp", weight: "68Kg" },
            actions: [{ type: 'cart', name: 'SPTE Electric' }]
        }
    ],
    'road-roller-models': [
        {
            model: "SRR30",
            name: "Ride on Roller - SRR30",
            image: "./Assets/Product Images/srr.png",
            description: "Heavy-duty ride-on roller designed for large scale road construction projects.",
            specs: [
                { icon: "fa-solid fa-truck-monster", text: "Type: Ride-on Roller" },
                { icon: "fa-solid fa-gas-pump", text: "Engine: Diesel Engine" },
                { icon: "fa-solid fa-road", text: "Gradeability: 30%" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed: 0-8 km/h" },
                { icon: "fa-solid fa-arrows-left-right", text: "Vibration Frequency: 0-3000 vpm" },
                { icon: "fa-solid fa-compress-arrows-alt", text: "Centrifugal Force: 30 kN" },
                { icon: "fa-solid fa-ruler-vertical", text: "Width: 1200 mm" },
                { icon: "fa-solid fa-fan", text: "Water Tank Capacity: 150 L" },
                { icon: "fa-solid fa-gauge-high", text: "Fuel Tank Capacity: 15 L" },
                { icon: "fa-solid fa-horse-head", text: "Engine Power: 25 HP" }
            ],
            compare: { model: "SRR30", category: "road-rollers", type: "Ride-on Roller", weight: "3000 kg", engine: "Diesel Engine", power: "25 HP", gradeability: "30%", speed: "0-8 km/h", vibration: "0-3000 vpm", centrifugal: "30 kN", width: "1200 mm", water: "150 L", fuel: "15 L" },
            actions: [{ type: 'cart', name: 'SRR30 Ride on Roller' }]
        },
        {
            model: "SWR 30",
            name: "SWR 30 Walk Behind Roller",
            image: "./Assets/Product Images/swr.png",
            description: "Compact walk-behind roller ideal for tight spaces and patch work.",
            specs: [
                { icon: "fa-solid fa-person-walking", text: "Type: Walk-behind Roller" },
                { icon: "fa-solid fa-gas-pump", text: "Engine: 10 HP Diesel" },
                { icon: "fa-solid fa-road", text: "Gradeability: 25%" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed: 0-5 km/h" },
                { icon: "fa-solid fa-arrows-left-right", text: "Vibration Frequency: 0-3000 vpm" },
                { icon: "fa-solid fa-horse-head", text: "Vibration Source: Single Drum" },
                { icon: "fa-solid fa-compress-arrows-alt", text: "Centrifugal Force: 20 kN" },
                { icon: "fa-solid fa-ruler-vertical", text: "Width: 800 mm" },
                { icon: "fa-solid fa-fan", text: "Water Tank Capacity: 100 L" },
                { icon: "fa-solid fa-gauge-high", text: "Fuel Tank Capacity: 10 L" }
            ],
            compare: { model: "SWR 30", category: "road-rollers", type: "Walk-behind Roller", weight: "800 kg", engine: "Diesel Engine", power: "10 HP", gradeability: "25%", speed: "0-5 km/h", vibration: "0-3000 vpm", vibrationSource: "Single Drum",centrifugal: "20 kN", width: "800 mm", water: "100 L", fuel: "10 L" },
            actions: [{ type: 'cart', name: 'SWR 30 Walk behind' }]
        },
        {
            model: "SWR30 FH",
            name: "Walk behind roller - SWR30 FH",
            image: "./Assets/Product Images/swr fh.png",
            description: "Enhanced walk-behind roller with superior compaction force.",
            specs: [
                { icon: "fa-solid fa-person-walking", text: "Type: Walk-behind Roller" },
                { icon: "fa-solid fa-gas-pump", text: "Engine: Diesel Engine" },
                { icon: "fa-solid fa-road", text: "Gradeability: 30%" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed: 0-6 km/h" },
                { icon: "fa-solid fa-arrows-left-right", text: "Vibration Frequency: 0-3500 vpm" },
                { icon: "fa-solid fa-horse-head", text: "Vibration Source: Dual Drum" },
                { icon: "fa-solid fa-compress-arrows-alt", text: "Centrifugal Force: 25 kN" },
                { icon: "fa-solid fa-ruler-vertical", text: "Width: 900 mm" },
                { icon: "fa-solid fa-fan", text: "Water Tank Capacity: 120 L" },
                { icon: "fa-solid fa-gauge-high", text: "Fuel Tank Capacity: 12 L" }
            ],
            compare: { model: "SWR30 FH", category: "road-rollers", type: "Walk-behind Roller", weight: "900 kg", engine: "Diesel Engine", power: "15 HP", gradeability: "30%", speed: "0-6 km/h", vibration: "0-3500 vpm", vibrationSource: "Dual Drum", centrifugal: "25 kN", width: "900 mm", water: "120 L", fuel: "12 L" },
            actions: [{ type: 'cart', name: 'SWR30 FH Walk behind' }]
        }
    ],
    'scrap-straightener-models': [
        {
            model: "GX8-25 Eco Model",
            name: "GX8-25",
            image: "./Assets/Product Images/sss.png",
            description: "Cost-effective solution for straightening coils and lighter scrap.",
            specs: [
                { icon: "fa-solid fa-arrow-right-long", text: "Range: 4mm - 12mm" },
                { icon: "fa-solid fa-gauge", text: "Speed: 25 meters/min" },
                { icon: "fa-solid fa-recycle", text: "Usage: Coil & Light Scrap" }
            ],
            compare: { model: "GX8-25 Eco Model", category: "scrap-straightener-models", range: "4mm - 12mm", "speed-feature": "25 meters/min", "usage-accuracy": "Coil & Light Scrap" },
            actions: [{ type: 'cart', name: 'GX8-25 Eco Model' }]
        },
        {
            model: "GX6-25 Pro Model",
            name: "GX6-25 Pro (+ Cutter)",
            image: "./Assets/Product Images/sss.png",
            description: "Advanced straightener with integrated hydraulic cutter for precise lengths.",
            specs: [
                { icon: "fa-solid fa-arrow-right-long", text: "Range: 6mm - 16mm" },
                { icon: "fa-solid fa-scissors", text: "Feature: Auto-Cut Function" },
                { icon: "fa-solid fa-arrows-left-right", text: "Accuracy: High Precision" }
            ],
            compare: { model: "GX6-25 Pro Model", category: "scrap-straightener-models", range: "6mm - 16mm", "speed-feature": "Auto-Cut Function", "usage-accuracy": "High Precision" },
            actions: [{ type: 'cart', name: 'GX6-25 Pro Model' }]
        }
    ],
    'shutter-vibrator-models': {
        highFrequency: [
            {
                model: "SHFS-4215",
                name: "SHFS-4215",
                image: "./Assets/Product Images/shfs-4215.png",
                description: "High-frequency model for superior performance.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 1.5 HP" },
                    { icon: "fa-solid fa-wave-square", text: "Vibrations: 6000 RPM" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 42V / 200Hz" },
                ],
                compare: { model: "SHFS-4215", category: "shutter-vibrators", power: "1.5 HP", vibrations: "6000 RPM", voltage: "42V (200Hz)" },
                actions: [{ type: 'cart', name: 'Shutter Vibrator SHFS-4215' }]
            },
            {
                model: "SHFS-4210",
                name: "SHFS-4210",
                image: "./Assets/Product Images/shfs.png",
                description: "Reliable high-frequency performance.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 1 HP" },
                    { icon: "fa-solid fa-wave-square", text: "Vibrations: 3000 RPM" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 42V / 200Hz" }
                ],
                compare: { model: "SHFS-4210", category: "shutter-vibrators", power: "1 HP", vibrations: "3000 RPM", voltage: "42V (200Hz)" },
                actions: [{ type: 'cart', name: 'Shutter Vibrator SHFS-4210' }]
            }
        ],
        threePhase: [
            {
                model: "SSV-305",
                name: "SSV-305",
                image: "./Assets/Product Images/ssv-305.png",
                description: "Compact 3-phase model for smaller precast elements.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 0.5 HP" },
                    { icon: "fa-solid fa-wave-square", text: "Vibrations: 3000 RPM" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 415V / 50Hz" }
                ],
                compare: { model: "SSV-305", category: "shutter-vibrators", power: "0.5 HP", vibrations: "3000 RPM", voltage: "415V (50Hz)" },
                actions: [{ type: 'cart', name: 'Shutter Vibrator SSV-305' }]
            },
            {
                model: "SSV-310",
                name: "SSV-310",
                image: "./Assets/Product Images/ssv-310.png",
                description: "Standard 3-phase model for general formwork.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 1 HP" },
                    { icon: "fa-solid fa-wave-square", text: "Vibrations: 3000 RPM" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 415V / 50Hz" }
                ],
                compare: { model: "SSV-310", category: "shutter-vibrators", power: "1 HP", vibrations: "3000 RPM", voltage: "415V (50Hz)" },
                actions: [{ type: 'cart', name: 'Shutter Vibrator SSV-310' }]
            },
            {
                model: "SSV-320",
                name: "SSV-320",
                image: "./Assets/Product Images/ssv-320.png",
                description: "Powerful 3-phase motor for heavy-duty applications.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Power: 2 HP" },
                    { icon: "fa-solid fa-wave-square", text: "Vibrations: 3000 RPM" },
                    { icon: "fa-solid fa-plug", text: "Voltage: 415V / 50Hz" }
                ],
                compare: { model: "SSV-320", category: "shutter-vibrators", power: "2 HP", vibrations: "3000 RPM", voltage: "415V (50Hz)" },
                actions: [{ type: 'cart', name: 'Shutter Vibrator SSV-320' }]
            }
        ]
    },
    'surface-smootheners': {
        screedVibrators: [
            {
                model: "SSVE-2",
                name: "Screed Vibrator SSVE-2",
                image: "./Assets/Product Images/screed vibrator.png",
                description: "Electric vibrator for leveling concrete surfaces. Blades sold separately.",
                specs: [
                    { icon: "fa-solid fa-bolt", text: "Drive: Electric Motor" },
                    { icon: "fa-solid fa-gauge-high", text: "Speed: 2000 RPM" },
                    
                ],
                compare: { model: "SSVE-2", category: "surface-smootheners", type: "Screed Vibrator", power: "Electric Motor", speed: "2000 RPM" },
                actions: [{ type: 'cart', name: 'Screed Vibrator SSVE-2' }]
            }
        ],
        powerTrowels: [
            {
                model: "SPTP",
                name: "SPTP (Petrol Powered)",
                image: "./Assets/Product Images/sptp.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-tag", text: "Model: SPTP" },
                    { icon: "fa-solid fa-ruler-horizontal", text: "Working Diameter: 1000 mm" },
                    { icon: "fa-solid fa-gears", text: "Drive System: Honda Engine / Equivalent" },
                    { icon: "fa-solid fa-fan", text: "No Of Blades: 4" },
                    { icon: "fa-solid fa-horse-head", text: "Engine Power: 2Hp" },
                    { icon: "fa-solid fa-weight-scale", text: "Weight: 70Kg" }
                ],
                compare: { model: "SPTP", category: "surface-smootheners", type: "Power Trowel", diameter: "1000 mm", blades: "4", power: "2Hp", weight: "70Kg" },
                actions: [{ type: 'cart', name: 'SPTP Petrol' }]
            },
            {
                model: "SPTE Electric",
                name: "SPTE (Electric Powered)",
                image: "./Assets/Product Images/spte.png",
                description: "",
                specs: [
                    { icon: "fa-solid fa-tag", text: "Model: SPTE" },
                    { icon: "fa-solid fa-ruler-horizontal", text: "Working Diameter: 1000 mm" },
                    { icon: "fa-solid fa-bolt", text: "Drive System: Crompton motor / Equivalent" },
                    { icon: "fa-solid fa-fan", text: "No Of Blades: 4" },
                    { icon: "fa-solid fa-horse-head", text: "Motor Power: 3Hp" },
                    { icon: "fa-solid fa-weight-scale", text: "Weight: 68Kg" }
                ],
                compare: { model: "SPTE Electric", category: "surface-smootheners", type: "Power Trowel", diameter: "1000 mm", blades: "4", power: "3Hp", weight: "68Kg" },
                actions: [{ type: 'cart', name: 'SPTE Electric' }]
            }
        ]
    },
    'suspended-rope-platform': [
        {
            model: "ZLP800",
            name: "ZLP800 Suspended Platform",
            image: "./Assets/Product Images/srp.png",
            description: "The industry-standard for safety and reliability in high-rise access.",
            specs: [
                { icon: "fa-solid fa-tag", text: "Model: ZLP800" },
                { icon: "fa-solid fa-weight-scale", text: "Rated Load: Up to 1000 Kgs" },
                { icon: "fa-solid fa-arrows-up-down", text: "Max Lifting Height: Up to 100m" },
                { icon: "fa-solid fa-shield-halved", text: "Safety: Equipped with Load Calibration Cell" },
                { icon: "fa-solid fa-ruler-combined", text: "Platform Size: Customizable" },
                { icon: "fa-solid fa-cogs", text: "Power: 220V/380V, 50Hz" },
                { icon: "fa-solid fa-people-roof", text: "Capacity: 2-10 Persons" }
            ],
            actions: [{ type: 'enquire-link', href: '../index.html#contact' }]
        }
    ],
    'vibrators': [
        {
            model: "3HP 1PH Vibrator",
            name: "3HP 1PH Electrical Vibrators",
            image: "./Assets/Product Images/sev31.png",
            description: "Single-phase 3HP motor with high centrifugal force for medium-sized pours.",
            specs: [
                { icon: "fa-solid fa-bolt-lightning", text: "Power Output: 3 HP (approx. 2.2 kW)" },
                { icon: "fa-solid fa-plug", text: "Voltage: 220V – 240V AC" },
                { icon: "fa-solid fa-chart-line", text: "Current (Amps): 12 – 15 A" },
                { icon: "fa-solid fa-clock", text: "Frequency: 50 / 60 Hz" },
                { icon: "fa-solid fa-shield-halved", text: "Insulation Class: Class F (155°C)" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed (RPM): 2800 – 3000 RPM" }
            ],
            compare: { model: "3HP 1PH Vibrator", category: "vibrators", power: "3 HP", voltage: "220V-240V", current: "12-15 A", speed: "2800-3000 RPM" },
            actions: [
                { type: 'cart', name: '3HP 1PH Vibrator' }
            ]
        },
        {
            model: "3HP 3PH Vibrator",
            name: "3HP 3PH Electrical Vibrators",
            image: "./Assets/Product Images/sev33.png",
            description: "Three-phase 3HP for continuous heavy-duty consolidation on large pours.",
            specs: [
                { icon: "fa-solid fa-bolt-lightning", text: "Power Output: 3 HP (approx. 2.2 kW)" },
                { icon: "fa-solid fa-plug", text: "Voltage: 380V – 415V AC" },
                { icon: "fa-solid fa-chart-line", text: "Current (Amps): 4.5 – 6 A" },
                { icon: "fa-solid fa-clock", text: "Frequency: 50 / 60 Hz" },
                { icon: "fa-solid fa-shield-halved", text: "Insulation Class: Class F (155°C)" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed (RPM): 2850 – 3000 RPM" }
            ],
            compare: { model: "3HP 3PH Vibrator", category: "vibrators", power: "3 HP", voltage: "380V-415V", current: "4.5-6 A", speed: "2850-3000 RPM" },
            actions: [
            
                { type: 'cart', name: '3HP 3PH Vibrator' }
            ]
        },
        {
            model: "2HP Vibrator",
            name: "2HP Electrical Vibrators",
            image: "./Assets/Product Images/sev31.png",
            description: "Compact 2HP units ideal for small pours and repair works.",
            specs: [
                { icon: "fa-solid fa-bolt-lightning", text: "Power Output: 2 HP (approx. 1.5 kW)" },
                { icon: "fa-solid fa-plug", text: "Voltage: 220V – 240V AC" },
                { icon: "fa-solid fa-chart-line", text: "Current (Amps): ~8 – 10 A" },
                { icon: "fa-solid fa-clock", text: "Frequency: 50 / 60 Hz" },
                { icon: "fa-solid fa-shield-halved", text: "Insulation Class: Class F (155°C)" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed (RPM): 2800 – 3000 RPM" }
            ],
            compare: { model: "2HP Vibrator", category: "vibrators", power: "2 HP", voltage: "220V-240V", current: "8-10 A", speed: "2800-3000 RPM" },
            actions: [
                
                { type: 'cart', name: '2HP Vibrator' }
            ]
        },
        {
            model: "Diesel Vibrator",
            name: "Diesel Vibrator",
            image: "./Assets/Product Images/sdv.png",
            description: "Robust diesel-powered vibrator for heavy-duty site applications.",
            specs: [
                { icon: "fa-solid fa-bolt-lightning", text: "Power Output: 5 HP" },
                { icon: "fa-solid fa-gas-pump", text: "Fuel Type: Diesel" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed (RPM): 3000 RPM" },
                { icon: "fa-solid fa-cogs", text: "Mount: Heavy Duty Frame" }
            ],
            compare: { model: "Diesel Vibrator", category: "vibrators", power: "5 HP", fuel: "Diesel", speed: "3000 RPM" },
            actions: [
                
                { type: 'cart', name: 'Diesel Vibrator' }
            ]
        },
        {
            model: "Petrol Vibrator",
            name: "Petrol Vibrator",
            image: "./Assets/Product Images/spv.png",
            description: "Versatile petrol-powered vibrator for sites without electricity.",
            specs: [
                { icon: "fa-solid fa-bolt-lightning", text: "Power Output: 5.5 HP" },
                { icon: "fa-solid fa-gas-pump", text: "Fuel Type: Petrol" },
                { icon: "fa-solid fa-tachometer-alt", text: "Speed (RPM): 3000 RPM" },
                { icon: "fa-solid fa-cogs", text: "Mount: Heavy Duty Frame" }
            ],
            compare: { model: "Petrol Vibrator", category: "vibrators", power: "5.5 HP", fuel: "Petrol", speed: "3000 RPM" },
            actions: [
               
                { type: 'cart', name: 'Petrol Vibrator' }
            ]
        }
    ],
    'scissor-lift-models': [
        {
            model: "Hydraulic Scissor Lift",
            name: "Hydraulic Scissor Lift",
            image: "./Assets/Product Images/scissorlift.png",
            description: "Self-propelled and stationary scissor lifts for working at heights.",
            specs: [
                { icon: "fa-solid fa-ruler-vertical", text: "Max Height: 6m - 14m" },
                { icon: "fa-solid fa-weight-hanging", text: "Load Capacity: 300kg - 500kg" },
                { icon: "fa-solid fa-bolt", text: "Operation: Battery / Electric" }
            ],
            compare: { model: "Hydraulic Scissor Lift", category: "scissor-lifts", height: "6m - 14m", capacity: "300kg - 500kg", operation: "Battery / Electric" },
            actions: [{ type: 'cart', name: 'Hydraulic Scissor Lift' }]
        }
    ],
    'prefabStructures': [
        {
            name: "Portable Office Cabins",
            image: "./Assets/Product Images/cabin.png",
            description: "Ready-to-use site offices with insulation, electrical fittings, and durable build.",
            specs: [
                { text: "Custom Dimensions" },
                { text: "Insulated Walls" },
                { text: "Electrical Ready" }
            ],
            actions: [{ type: 'enquire' }]
        },
        {
            name: "New/Used Shipping Containers",
            image: "./Assets/Product Images/container.png",
            description: "Heavy-duty containers suitable for storage, site offices, or modification.",
            specs: [
                { text: "20ft & 40ft Options" },
                { text: "Weather Resistant" },
                { text: "Secure Locking" }
            ],
            actions: [{ type: 'enquire' }]
        },
        {
            name: "Portable Toilet (FRP)",
            image: "./Assets/Product Images/toilet.png",
            description: "Hygienic, lightweight, and easy-to-clean FRP toilets for construction sites.",
            specs: [
                { text: "FRP Material" },
                { text: "Easy Maintenance" },
                { text: "Water Tank Option" }
            ],
            actions: [{ type: 'enquire' }]
        }
    ],
    'civic-utility-products': [
        {
            name: "Wheel Barrow",
            image: "./Assets/Product Images/heavybarrow.png",
            description: "Heavy-duty wheel barrow for transporting construction materials and debris.",
            specs: [
                { icon: "fa-solid fa-cart-flatbed", text: "Capacity: 100 Litres" },
                { icon: "fa-solid fa-weight-hanging", text: "Load: Up to 150 Kg" },
                { icon: "fa-solid fa-circle", text: "Wheel: Pneumatic / Solid Rubber" }
            ],
            actions: [{ type: 'cart', name: 'Wheel Barrow' }]
        },
        {
            name: "Sand Screener",
            image: "./Assets/Product Images/screener.png",
            description: "Electric sand screening machine for filtering fine sand from gravel.",
            specs: [
                { icon: "fa-solid fa-filter", text: "Mesh Size: Customizable" },
                { icon: "fa-solid fa-bolt", text: "Motor: 1 HP Electric" },
                { icon: "fa-solid fa-rotate", text: "Operation: Vibratory" }
            ],
            actions: [{ type: 'cart', name: 'Sand Screener' }]
        },
        {
            name: "Fogger Machine",
            image: "./Assets/Product Images/fogger.png",
            description: "Thermal fogging machine for mosquito control and sanitation.",
            specs: [
                { icon: "fa-solid fa-spray-can-sparkles", text: "Tank: 5 Litres" },
                { icon: "fa-solid fa-gas-pump", text: "Fuel: Petrol / Electric" }
            ],
            actions: [{ type: 'cart', name: 'Fogger Machine' }]
        },
        {
            name: "Welding Machine",
            image: "./Assets/Product Images/welding.png",
            description: "Portable inverter welding machine for site fabrication.",
            specs: [
                { icon: "fa-solid fa-fire-burner", text: "Current: 200A - 400A" },
                { icon: "fa-solid fa-plug", text: "Type: Inverter / Arc" }
            ],
            actions: [{ type: 'cart', name: 'Welding Machine' }]
        },
        {
            name: "Cast Iron Weights",
            image: "./Assets/Product Images/weights.png",
            description: "Standard cast iron test weights for load testing and calibration.",
            specs: [
                { icon: "fa-solid fa-weight-hanging", text: "Range: 5kg - 50kg" },
                { icon: "fa-solid fa-cube", text: "Material: Cast Iron" }
            ],
            actions: [{ type: 'cart', name: 'Cast Iron Weights' }]
        }
    ],
    'repair-services': [
        {
            name: "On-Site Repair",
            image: "./Assets/Product Images/on-site.png",
            description: "Expert technicians dispatched to your location for immediate repairs.",
            actions: [{ type: 'repair', name: 'On-Site Repair' }]
        },
        {
            name: "Workshop Service",
            image: "./Assets/Product Images/workshop.png",
            description: "Comprehensive servicing and overhauling at our fully equipped workshop.",
            actions: [{ type: 'repair', name: 'Workshop Service' }]
        },
        {
            name: "Spare Parts Replacement",
            image: "./Assets/Product Images/spare.png",
            description: "Genuine spare parts replacement for all major construction equipment brands.",
            actions: [{ type: 'repair', name: 'Spare Parts' }]
        }
    ],
    'rental-services': [
        {
            name: "Bar Bender",
            image: "./Assets/Product Images/bender_sketch.png",
            description: "Rent bar benders, cutters, and rollers for your heavy construction needs.",
            actions: [{ type: 'rent', name: 'Bar Bender' }]
        },
        {
            name: "Bar Cutter",
            image: "./Assets/Product Images/cutter_sketch.png",
            description: "Compactors, vibrators, and mixers available for daily or weekly rent.",
            actions: [{ type: 'rent', name: 'Bar Cutter' }]
        },
        {
            name: "Walk Behind Roller",
            image: "./Assets/Product Images/roller_sketch.png",
            description: "Suspended platforms and material lifts available for rent.",
            actions: [{ type: 'rent', name: 'Walk Behind Roller' }]
        }
    ],
    'maintenance-services': [
        {
            name: "Preventive Maintenance",
            image: "./Assets/Product Images/pms.png",
            description: "Regular check-ups to prevent breakdowns and extend equipment life.",
            actions: [{ type: 'enquire', name: 'Preventive Maintenance' }]
        },
        {
            name: "Annual Maintenance Contract",
            image: "./Assets/Product Images/amc.png",
            description: "Cost-effective AMC packages for complete peace of mind.",
            actions: [{ type: 'enquire', name: 'AMC' }]
        },
        {
            name: "Emergency Support",
            image: "./Assets/Product Images/es.png",
            description: "Breakdown support to minimize project downtime.",
            actions: [{ type: 'enquire', name: 'Emergency Support' }]
        }
    ]
};