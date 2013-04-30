var SaySomenthingModule = angular.module("SaySomenthing", []);

SaySomenthingModule.controller("TodoController", function($scope) {
  // Badun Tzz Lazy <3
  var SpeechRecognition = function() {
    if ( 'webkitSpeechRecognition' in window ) {
      this.recognition = new webkitSpeechRecognition();

      this.recognition.isRecording = false;
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'pt-BR';

      this.recognition.onstart = function(evt) {
        this.isRecording = true;
      };

      this.recognition.onresult = function(evt) {
        var recordedText = "";

        for (var i = event.resultIndex; i < event.results.length; i += 1) {
          recordedText += event.results[i][0].transcript;
        }
        // Badun Tzz Lazy <3
        $scope.$apply(function($scope) {
          $scope.todoContent = recordedText;
        });
      };

      this.recognition.onerror = function(evt) {
        console.log("Error: " + evt);
      };

      this.recognition.onend = function(evt) {
        // Badun Tzz Lazy <3
        $scope.$apply(function($scope) {
          $scope.recordingButtonIndex = 0;
        });
        this.isRecording = false;
        this.stop();
      };
    }
  };

  var SPEECH = new SpeechRecognition()

  $scope.sidebarClass = ["sidebar", "sidebar sidebar-opened"];
  $scope.sidebarIndex = 0;
  $scope.recordingButtonClass = ["icon-speech button-speech", "icon-speech button-speech recording"];
  $scope.recordingButtonIndex = 0;
  $scope.checkTodoClass = "icon-checkmark";

  $scope.items = [];

  chrome.storage.local.get(function(dataStoraged) {
    var localStoraged = Object.keys(dataStoraged).sort(function(a, b){ return a + b });

    localStoraged.forEach(function(key) {
      var obj;

      obj = {
        "id": key,
        "content": dataStoraged[key]["content"],
        "checked": dataStoraged[key]["checked"]
      };

      $scope.$apply(function($scope) {
        $scope.items.push(obj);
      });
    });
  });

  $scope.getClassRecordButton = function() {
    return $scope.recordingButtonClass[$scope.recordingButtonIndex];
  };

  $scope.getClassSidebar = function() {
    return $scope.sidebarClass[$scope.sidebarIndex];
  };

  $scope.showTodoList = function() {
    if ( $scope.sidebarIndex ) {
      $scope.sidebarIndex = 0;
      return;
    }
    $scope.sidebarIndex = 1;
  };

  $scope.startRecord = function() {
    if ( SPEECH.recognition.isRecording ) {
      $scope.recordingButtonIndex = 0;
      SPEECH.recognition.isRecording = false;
      SPEECH.recognition.stop();
      return;
    }
    $scope.recordingButtonIndex = 1;
    SPEECH.recognition.start();
  };

  $scope.getListItemClass = function(item) {
    if ( item.checked ) {
      return "list-item item-checked";
    }
    return "list-item";
  };

  $scope.checkTodoItem = function(item) {
    var dataToStorage = {};

    // Badun Tzz Lazy <3
    if ( item.checked ) {
      dataToStorage[item.id] = {
        "content": item.content,
        "checked": false
      };

      item.checked = false;
      chrome.storage.local.set(dataToStorage);
      return;
    }

    // Badun Tzz Lazy <3
    dataToStorage[item.id] = {
      "content": item.content,
      "checked": true
    };

    item.checked = true;
    chrome.storage.local.set(dataToStorage);
    return;
  };

  $scope.getCheckButtonClass = function(item) {
    if ( item.checked ) {
      return "icon-checkmark-circle";
    }
    return "icon-checkmark";
  };

  $scope.remove = function(index, item) {
    $scope.items.splice(index, 1);
    chrome.storage.local.remove(item.id);
  };

  $scope.addTodo = function() {
    var hash = "" + Date.now()
    , todoContent = $scope.todoContent
    , dataToStorage = {}
    , dataToPush = {};

    dataToStorage[hash] = {
      "content": todoContent,
      "checked": false
    };

    dataToPush = {
      "id": hash,
      "content": todoContent,
      "checked": false
    };

    chrome.storage.local.set(dataToStorage);
    $scope.items.unshift(dataToPush);
    $scope.todoContent = "";
  };
});