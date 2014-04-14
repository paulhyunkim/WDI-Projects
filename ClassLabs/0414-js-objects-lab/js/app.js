if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
      }
      return undefined;
    }
  });
}

var Phone = {
  imagesHTML: function() {
    return '<div class="phone-images">'+this.images.map(function(image) {
      return '<img src="'+image+'"class="phone">';
    }).join(" ") + '</div>';
  },

  descriptionHTML: function() {
    return '<h1>'+this.name+'</h1> \
    <p>'+this.description+'</p> \
    <ul class="specs"> \
    <li> \
      <span>Battery</span> \
      <dl> \
        <dt>Type</dt> \
        <dd>'+ this.battery.type + '</dd> \
        <dt>Talk Time</dt> \
        <dd>'+this.battery.talkTime+'</dd> \
        <dt>Standby time (max)</dt> \
        <dd>'+this.battery.standbyTime+'</dd> \
        </dl> \
      </li> \
    <li> \
      <span>Storage and Memory</span> \
      <dl> \
        <dt>RAM</dt> \
        <dd>'+this.storage.ram+'</dd> \
        <dt>Internal Storage</dt> \
        <dd>'+this.storage.flash+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Connectivity</span> \
      <dl> \
        <dt>Network Support</dt> \
        <dd>'+this.connectivity.cell+'</dd> \
        <dt>WiFi</dt> \
        <dd>'+this.connectivity.wifi+'</dd> \
        <dt>Bluetooth</dt> \
        <dd>'+this.connectivity.bluetooth+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Android</span> \
      <dl> \
        <dt>OS Version</dt> \
        <dd>'+this.android.os+'</dd> \
        <dt>UI</dt> \
        <dd>'+this.android.ui+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Size and Weight</span> \
      <dl> \
        <dt>Weight</dt> \
        <dd>'+this.sizeAndWeight.weight+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Display</span> \
      <dl> \
        <dt>Screen size</dt> \
        <dd>'+this.display.screenSize+'</dd> \
        <dt>Screen resolution</dt> \
        <dd>'+this.display.screenResolution+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Hardware</span> \
      <dl> \
        <dt>CPU</dt> \
        <dd>'+this.hardware.cpu+'</dd> \
        <dt>USB</dt> \
        <dd>'+this.hardware.usb+'</dd> \
        <dt>Audio / headphone jack</dt> \
        <dd>'+this.hardware.audioJack+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Camera</span> \
      <dl> \
        <dt>Primary</dt> \
        <dd>'+this.camera.primary+'</dd> \
        <dt>Features</dt> \
        <dd>'+this.camera.features.join(', ')+'</dd> \
      </dl> \
    </li> \
    <li> \
      <span>Additional Features</span> \
      <dd>'+this.additionalFeatures+'</dd> \
    </li> \
  </ul>';
  },

  toHTML: function() {
    return this.imagesHTML() + this.descriptionHTML();
  }
}

function loadImage(id) {
}

var PhoneListPrototype = {
  toHTML: function() {
    return this.phones.map(function(item) { return '<li onclick="loadImage(\''+item.id+'\');" class="thumbnail phone-listing"> '+item.name+'</li>'; } ).join(" ");
  }
}

var fromPrototype = function(prototype, object) {
  var newObject = Object.create(prototype);

  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      newObject[prop] = object[prop];
    }
  }

  return newObject;
};

function startup() {
  var phoneListDiv = document.getElementById("phoneList");
  var phoneList = fromPrototype(PhoneListPrototype, phonesJSON);
  phoneListDiv.innerHTML = phoneList.toHTML();  
  for (var i = 0; i < phoneDetails.length; i++) {
    phoneDetails[i].__proto__ = Phone;
  } 
  phoneContentDiv = document.getElementById("phoneContent");
  phoneContent.innerHTML = phoneDetails[4].toHTML();
}

window.onload = startup;

