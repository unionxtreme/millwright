(function () {
	/**
	 * description fnMathRound
	 * function shortcut
	 */
	var fnMathRound = Math.round;
	var fnRound = function (n, places) {
		var retVal = Math.round(n*Math.pow(10,places))/Math.pow(10,places);
		return parseFloat(retVal);
	};

	/**
	 * description Queue
	 * object
	 */
	var Queue = function () {

		var bInit = false,
			elInput = null,
			aInputs = [];

		function add(el, sId, iVal) {
			if (el.id !== sId && bInit) {
				aInputs.push([el, iVal]);
			}

			return false;
		}

		function init() {
			bInit = true;
			aInputs = [];
			return false;
		}

		function reset() {
			bInit = false;
			aInputs = [];
			return false;
		}

		function updateFields() {
			var i = aInputs.length;

			while (i--) {
				if (bInit) {
					elInput = aInputs[i];
					elInput[0].value = elInput[1];
				}
				else {
					i = null;
				}
			}

			aInputs = [];

			return false;
		}

		return {
		
			add: function (el, sId, iVal) {
				add(el, sId, iVal);
				return false;
			},

			init: function() {
				init();
				return false;
			},

			reset: function() {
				reset();
				return false;
			},

			updateFields: function() {
				updateFields();
				return false;
			}

		};

	}();

	/**
	 * description Converter
	 * constructor
	 */
	function Converter(o) {

		var elTarget,
			iValue;

		$('#' + o.elementId).keyup(function (e) {
			// reset queue
			Queue.reset();

			// get ref to target
			elTarget = $(e.target);

			// check to make sure is input
			if (!elTarget.hasClass('input')) {
				return false;
			}

			// stop event bubbling
			e.stopPropagation();

			// get keyed val
			iValue = elTarget.val();

			// check for "."
			if (iValue === '.') {
				return;
			}

			// validate input (even though we're
			// invoking the numbers only keypad,
			// older version of the iPhone may 
			// still show full keyboard.)
			if (/^[\d\.\-]*$/.test(iValue)) {

				setTimeout(function () {
					o.updater.update({
						target: elTarget,
						value: (iValue) ? iValue : 0
					});
				}, 1);

			}
			
			return false;

		});
		
		return false;

	}

	/**
	 * description Area Converter
	 * object
	 */
	Converter({
		elementId: 'area_calc_form',
		updater: function() {

			var elCentimeters = document.getElementById('sq_centimeters'),
				elMeters = document.getElementById('sq_meters'),
				elHectares = document.getElementById('hectares'),
				elKilometers = document.getElementById('sq_kilometers'),
				elInches = document.getElementById('sq_inches'),
				elFeet = document.getElementById('sq_feet'),
				elYards = document.getElementById('sq_yards'),
				elMiles = document.getElementById('sq_miles'),
				elAcres = document.getElementById('acres');

			return {
			
				update: function(o) {
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*1000)/1000,
						sId = elTarget.attr('id');

					var iCentimeters = fnMathRound(iValue * iMultiplier*10000000000)/10000000000,
						iMeters = fnMathRound((iCentimeters/10000)*10000000000)/10000000000,
						iHectares = fnMathRound((iCentimeters/100000000)*10000000000)/10000000000,
						iKilometers = fnMathRound((iCentimeters/10000000000)*10000000000)/10000000000,
						iInches = fnMathRound((iCentimeters/6.4516)*10000000000)/10000000000,
						iFeet = fnMathRound((iCentimeters/929.0304)*10000000000)/10000000000,
						iYards = fnMathRound((iCentimeters/8361.2736)*10000000000)/10000000000,
						iMiles = fnMathRound((iCentimeters/25899881103)*10000000000)/10000000000,
						iAcres = fnMathRound((iCentimeters/40468564.224)*10000000000)/10000000000;

					Queue.init();
					Queue.add(elCentimeters, sId, iCentimeters);
					Queue.add(elMeters, sId, iMeters);
					Queue.add(elHectares, sId, iHectares);
					Queue.add(elKilometers, sId, iKilometers);
					Queue.add(elInches, sId, iInches);
					Queue.add(elFeet, sId, iFeet);
					Queue.add(elYards, sId, iYards);
					Queue.add(elMiles, sId, iMiles);
					Queue.add(elAcres, sId, iAcres);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

	/**
	 * description Length Converter
	 * object
	 */
	Converter({
		elementId: 'length_calc_form',
		updater: function() {

			var elMillimeter = document.getElementById('millimeter'),
				elCentimeter = document.getElementById('centimeter'),
				elInch = document.getElementById('inch'),
				elFoot = document.getElementById('foot'),
				elMeter = document.getElementById('meter'),
				elFathom = document.getElementById('fathom'),
				elYard = document.getElementById('yard'),
				elKilometer = document.getElementById('kilometer'),
				elMile = document.getElementById('mile'),
				elNauticalMile = document.getElementById('nautical-mile');

			return {
			
				update: function(o) {
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*1000)/1000,
						sId = elTarget.attr('id');

					var iMillimeter = fnMathRound(iValue * iMultiplier*1000)/1000,
						iCentimeter = fnMathRound((iMillimeter/10)*1000)/1000,
						iInch = fnMathRound((iMillimeter/25.4)*1000)/1000,
						iFoot = fnMathRound((iMillimeter/304.8)*1000)/1000,
						iYard = fnMathRound((iMillimeter/914.39)*1000)/1000,
						iMeter = fnMathRound((iMillimeter/1000)*100000)/100000,
						iFathom = fnMathRound((iMillimeter/1828.8)*100000)/100000,
						iKilometer = fnMathRound((iMillimeter/1000000)*1000000)/1000000,
						iMile = fnMathRound((iMillimeter/1609344)*10000000)/10000000,
						iNauticalMile = fnMathRound((iMillimeter/1852000)*10000000)/10000000;

					Queue.init();
					Queue.add(elMillimeter, sId, iMillimeter);
					Queue.add(elCentimeter, sId, iCentimeter);
					Queue.add(elInch, sId, iInch);
					Queue.add(elFoot, sId, iFoot);
					Queue.add(elYard, sId, iYard);
					Queue.add(elMeter, sId, iMeter);
					Queue.add(elFathom, sId, iFathom);
					Queue.add(elKilometer, sId, iKilometer);
					Queue.add(elMile, sId, iMile);
					Queue.add(elNauticalMile, sId, iNauticalMile);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

	/**
	 * description Liquid Converter
	 * object
	 */
	Converter({
		elementId: 'liquid_calc_form',
		updater: function() {

			
			var elTsp = document.getElementById('tsp'),
				elTbsp = document.getElementById('tbsp'),
				elFloz = document.getElementById('floz'),
				elCups = document.getElementById('cups'),
				elPt = document.getElementById('pt'),
				elQt = document.getElementById('qt'),
				elLitre = document.getElementById('litre'),
				elGal = document.getElementById('gal');

			return {
			
				update: function(o){
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*100)/100,
						sId = elTarget.attr('id');

					var iTsp = fnMathRound(iValue * iMultiplier*1000)/1000,
						iTbsp = fnMathRound((iTsp/3)*1000)/1000,
						iFloz = fnMathRound((iTsp/6)*1000)/1000,
						iCups = fnMathRound((iTsp/48)*1000)/1000,
						iPt = fnMathRound((iTsp/96)*10000)/10000,
						iQt = fnMathRound((iTsp/192)*100000)/100000,
						iLitre = fnMathRound((iTsp/202.875)*1000000)/1000000,
						iGal = fnMathRound((iTsp/768)*10000000)/10000000;

					Queue.init();
					Queue.add(elTsp, sId, iTsp);
					Queue.add(elTbsp, sId, iTbsp);
					Queue.add(elFloz, sId, iFloz);
					Queue.add(elCups, sId, iCups);
					Queue.add(elPt, sId, iPt);
					Queue.add(elQt, sId, iQt);
					Queue.add(elLitre, sId, iLitre);
					Queue.add(elGal, sId, iGal);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});
	
	/**
	 * description Pressure Converter
	 * object
	 */
	Converter({
		elementId: 'pressure_calc_form',
		updater: function() {

			var	elMbar = document.getElementById('mbar'),
				elKPa = document.getElementById('kPa'),
				elPsi = document.getElementById('psi'),
				elBar = document.getElementById('bar'),
				elMpa = document.getElementById('Mpa');

			return {
			
				update: function(o){
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*100)/100,
						sId = elTarget.attr('id');

					var iMbar = fnMathRound(iValue * iMultiplier*10000)/10000,
						iKPa = fnMathRound((iMbar/10)*100000)/100000,
						iPsi = fnMathRound((iMbar/68.94757)*100000)/100000,
						iBar = fnMathRound((iMbar/1000)*1000000)/1000000,
						iMpa = fnMathRound((iMbar/10000)*10000000)/10000000;

					Queue.init();
					Queue.add(elPsi, sId, iPsi);
					Queue.add(elKPa, sId, iKPa);
					Queue.add(elBar, sId, iBar);
					Queue.add(elMbar, sId, iMbar);
					Queue.add(elMpa, sId, iMpa);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

	/**
	 * description Temperature Converter
	 * object
	 */
	Converter({
		elementId: 'temp_calc_form',
		updater: function() {

			var elReaumur = document.getElementById('reaumur'),
				elCelsius = document.getElementById('celsius'),
				elFahrenheit = document.getElementById('fahrenheit'),
				elKelvin = document.getElementById('kelvin'),
				elRankine = document.getElementById('rankine');
			
			var iCelsius = null,
				iFahrenheit = null,
				iKelvin = null,
				iRankine = null,
				iReaumur = null,
				iValue = null,
				oCalcs = {},
				oCalc = {},
				sId = null;

			/**
			 * @constructor base calc constructor
			 */	
			var Base = function() {
				this.input = function() { 
					return iValue;
				};
				
				this.fahrenheit = function() { 
					return ((iCelsius * 1.8) + 32);
				};
				
				this.kelvin = function() { 
					return (iCelsius * 1) + 273.15;
				};

				this.rankine = function() { 
					return (iCelsius * 1.8) + 491.67;
				};

				this.reaumur = function() { 
					return (iCelsius * 0.8);
				};
			};

			// celsius
			oCalcs.celsius = new Base();
			oCalcs.celsius.celsius = oCalcs.celsius.input;

			// fahrenheit
			oCalcs.fahrenheit = new Base();
			oCalcs.fahrenheit.celsius = function() { 
				return ((iValue - 32) * (5/9));
			};
			oCalcs.fahrenheit.fahrenheit = oCalcs.fahrenheit.input;

			// kelvin
			oCalcs.kelvin = new Base();
			oCalcs.kelvin.celsius = function() { 
				return (iValue * 1) - 273.15;
			};
			oCalcs.kelvin.kelvin = oCalcs.kelvin.input;

			// rankine
			oCalcs.rankine = new Base();
			oCalcs.rankine.celsius = function() { 
				return ((iValue - 491.67) / 1.8);
			};
			oCalcs.rankine.rankine = oCalcs.rankine.input;

			// reaumur
			oCalcs.reaumur = new Base();
			oCalcs.reaumur.celsius = function() { 
				return (iValue * 1.25);
			};
			oCalcs.reaumur.reaumur = oCalcs.reaumur.input;

			return {
			
				update: function(o){
				
					sId = o.target.attr('id');
					iValue = parseFloat(o.value);
					oCalc = oCalcs[sId];

					iCelsius = fnMathRound(oCalc.celsius()*1000)/1000;
					iFahrenheit = fnMathRound(oCalc.fahrenheit()*1000)/1000;
					iKelvin = fnMathRound(oCalc.kelvin()*1000)/1000;
					iRankine = fnMathRound(oCalc.rankine()*1000)/1000;
					iReaumur = fnMathRound(oCalc.reaumur()*1000)/1000;
					
					Queue.init();
					Queue.add(elCelsius, sId, iCelsius);
					Queue.add(elFahrenheit, sId, iFahrenheit);
					Queue.add(elKelvin, sId, iKelvin);
					Queue.add(elRankine, sId, iRankine);
					Queue.add(elReaumur, sId, iReaumur);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

	/**
	 * description Time Converter
	 * object
	 */
	Converter({
		elementId: 'time_calc_form',
		updater: function() {

			//test
			var elCycles = document.getElementById('cycles'),
				elMilliseconds = document.getElementById('milliseconds'),
				elSeconds = document.getElementById('seconds'),
				elMinutes = document.getElementById('minutes'),
				elHours = document.getElementById('hours'),
				elDays = document.getElementById('days'),
				elWeeks = document.getElementById('weeks'),
				elMonths = document.getElementById('months');

			return {
			
				update: function(o){
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*100)/100,
						sId = elTarget.attr('id');

					var iCycles = fnMathRound(iValue * iMultiplier*1000)/1000,
						iMilliseconds = fnMathRound((iCycles/1000)*1000)/1000,
						iSeconds = fnMathRound((iMilliseconds/1000)*1000)/1000,
						iMinutes = fnMathRound((iSeconds/60)*10000)/10000,
						iHours = fnMathRound((iMinutes/60)*10000)/10000,
						iDays = fnMathRound((iHours/24)*100000)/100000,
						iWeeks = fnMathRound((iDays/7)*1000000)/1000000,
						iMonths = fnMathRound((iWeeks/4.348)*10000000)/10000000;

					Queue.init();
					Queue.add(elCycles, sId, iCycles);
					Queue.add(elMilliseconds, sId, iMilliseconds);
					Queue.add(elSeconds, sId, iSeconds);
					Queue.add(elMinutes, sId, iMinutes);
					Queue.add(elHours, sId, iHours);
					Queue.add(elDays, sId, iDays);
					Queue.add(elWeeks, sId, iWeeks);
					Queue.add(elMonths, sId, iMonths);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

	/**
	 * description Velocity Converter
	 * object
	 */
	Converter({
		elementId: 'velocity_calc_form',
		updater: function() {

			var elFps = document.getElementById('fps'),
				elKmh = document.getElementById('kmh'),
				elMph = document.getElementById('mph'),
				elKnots = document.getElementById('knots');

			return {
			
				update: function(o){
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*1000)/1000,
						sId = elTarget.attr('id');

					var iKmh = fnMathRound(iValue * iMultiplier*10000)/10000,
						iMph = fnMathRound((iKmh/1.609344)*10000)/10000,
						iFps = fnMathRound((iKmh/1.09728)*10000)/10000,
						iKnots = fnMathRound((iKmh/1.852)*10000)/10000;

					Queue.init();
					Queue.add(elFps, sId, iFps);
					Queue.add(elKmh, sId, iKmh);
					Queue.add(elMph, sId, iMph);
					Queue.add(elKnots, sId, iKnots);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

	/**
	 * description Weight Converter
	 * object
	 */
	Converter({
		elementId: 'weight_calc_form',
		updater: function() {

			var elMicrograms = document.getElementById('micrograms'),
				elMilligrams = document.getElementById('milligrams'),
				elCarats = document.getElementById('carats'),
				elGrams = document.getElementById('grams'),
				elOunces = document.getElementById('ounces'),
				elPounds = document.getElementById('pounds'),
				elKilograms = document.getElementById('kilograms'),
				elStones = document.getElementById('stones'),
				elMetricTons = document.getElementById('metric-tons'),
				elShortTons = document.getElementById('short-tons'),
				elLongTons = document.getElementById('long-tons');

			return {
			
				update: function(o){
				
					var elTarget = o.target,
						iMultiplier = elTarget.attr('multiplier'),
						iValue = (parseFloat(o.value)*1000)/1000,
						sId = elTarget.attr('id');

					var 
						iMicrograms = fnMathRound(iValue * iMultiplier*10000)/10000,
						iMilligrams = fnMathRound((iMicrograms/1000)*100000)/100000,
						iCarats = fnMathRound((iMilligrams/200)*1000000)/1000000,
						iGrams = fnMathRound((iMilligrams/1000)*10000000)/10000000,
						iOunces = fnMathRound((iMilligrams/28349.5231)*10000)/10000,
						iPounds = fnMathRound((iOunces/16)*10000)/10000,
						iKilograms = fnMathRound((iMilligrams/1000000)*100000)/100000,
						iStones = fnMathRound((iMilligrams/6350293)*100000)/100000,
						iMetricTons = fnMathRound((iMilligrams/1000000000)*10000000)/10000000,
						iShortTons = fnMathRound((iOunces/32000)*100000000)/100000000,
						iLongTons = fnMathRound((iMilligrams/1016046908.8)*100000000)/100000000;

					Queue.init();
					Queue.add(elMicrograms, sId, iMicrograms);
					Queue.add(elMilligrams, sId, iMilligrams);
					Queue.add(elCarats, sId, iCarats);
					Queue.add(elStones, sId, iStones);
					Queue.add(elGrams, sId, iGrams);
					Queue.add(elOunces, sId, iOunces);
					Queue.add(elPounds, sId, iPounds);
					Queue.add(elKilograms, sId, iKilograms);
					Queue.add(elMetricTons, sId, iMetricTons);
					Queue.add(elShortTons, sId, iShortTons);
					Queue.add(elLongTons, sId, iLongTons);
					Queue.updateFields();

					return false;

				}
			
			};

		}()

	});

})();