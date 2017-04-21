var FolderModel, JetstrapProject, JetstrapProjectHtmlZip, JetstrapProjects, MediaModel,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

JetstrapProjectHtmlZip = (function(superClass) {
  extend(JetstrapProjectHtmlZip, superClass);

  function JetstrapProjectHtmlZip() {
    return JetstrapProjectHtmlZip.__super__.constructor.apply(this, arguments);
  }

  JetstrapProjectHtmlZip.prototype.url = function() {
    return '/api/v1/project/' + this.id + '/htmlzip';
  };

  JetstrapProjectHtmlZip.prototype.idAttribute = 'unique_id';

  return JetstrapProjectHtmlZip;

})(Backbone.Model);

JetstrapProject = (function(superClass) {
  extend(JetstrapProject, superClass);

  function JetstrapProject() {
    return JetstrapProject.__super__.constructor.apply(this, arguments);
  }

  JetstrapProject.prototype.urlRoot = '/api/v1/project';

  JetstrapProject.prototype.idAttribute = 'unique_id';

  return JetstrapProject;

})(Backbone.Model);

JetstrapProjects = (function(superClass) {
  extend(JetstrapProjects, superClass);

  function JetstrapProjects() {
    return JetstrapProjects.__super__.constructor.apply(this, arguments);
  }

  JetstrapProjects.prototype.model = JetstrapProject;

  JetstrapProjects.prototype.url = '/api/v1/projects';

  JetstrapProjects.prototype.parse = function(response) {
    return response.projects;
  };

  return JetstrapProjects;

})(Backbone.Collection);

FolderModel = (function(superClass) {
  extend(FolderModel, superClass);

  function FolderModel() {
    return FolderModel.__super__.constructor.apply(this, arguments);
  }

  FolderModel.prototype.urlRoot = '/api/v1/folder';

  FolderModel.prototype.idAttribute = 'unique_id';

  return FolderModel;

})(Backbone.Model);

MediaModel = (function(superClass) {
  extend(MediaModel, superClass);

  function MediaModel() {
    return MediaModel.__super__.constructor.apply(this, arguments);
  }

  MediaModel.prototype.urlRoot = function() {
    return '/api/v1/project/' + this.get('project_unique_id') + '/mediaupload';
  };

  return MediaModel;

})(Backbone.Model);

window.JetstrapProject = JetstrapProject;

window.JetstrapProjects = JetstrapProjects;

window.FolderModel = FolderModel;

window.MediaModel = MediaModel;

var DashboardView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DashboardView = (function(superClass) {
  extend(DashboardView, superClass);

  function DashboardView() {
    return DashboardView.__super__.constructor.apply(this, arguments);
  }

  DashboardView.prototype.initialize = function() {
    var self;
    self = this;
    _.extend(this, Backbone.Events);
    return $(document).ready((function(_this) {
      return function() {
        return _this.onDocumentReady();
      };
    })(this));
  };

  DashboardView.prototype.onDocumentReady = function() {
    var self;
    self = this;
    window.Jetstrap && window.Jetstrap.builder.on('builder.planLimit', (function(_this) {
      return function() {
        return window.Account.showTab('billing', 'Please upgrade to create more screens and projects');
      };
    })(this));
    $('#folders').on('click', '[data-action="new-folder"]', (function(_this) {
      return function() {
        $('#new-folder-modal').modal('show');
        $('#new-folder-modal input:first').focus();
        return false;

        /*
        n = prompt 'Enter name of new project'
        if n
           * Hack to not allow names over 64 characters
          n = n.substr(0, 64)
          self.trigger 'newFolder', $('<div>').text(n).html()
        false
         */
      };
    })(this));
    $('#new-folder-modal form').submit((function(_this) {
      return function(e) {
        var framework, name;
        name = $('#new-folder-modal [name="name"]').val();
        framework = $('#new-folder-modal [name="framework"]').val();
        name = name.substr(0, 64);
        $('#new-folder-modal').modal('hide');
        self.trigger('newFolder', name, {
          framework: framework
        });
        return false;
      };
    })(this));
    $('#folders').on('click', '[data-action="rename-folder"]', function() {
      var n, p;
      p = $(this).closest('[data-folderid]');
      n = prompt('Enter new name for project', p.find('.folder-name').text());
      if (n) {
        n = n.substr(0, 64);
        self.trigger('folderRenamed', p.attr('data-folderid'), $('<div>').text(n).html());
      }
      return false;
    });
    $('#folders').on('click', '[data-action="delete-folder"]', function() {
      var n, p;
      p = $(this).closest('[data-folderid]');
      n = confirm('Are you sure you want to delete this project? This will delete all screens inside this project (cannot be undone!)');
      if (n) {
        self.trigger('folderDeleted', p.attr('data-folderid'));
      }
      return false;
    });
    $('#folders').on('click', '[data-action="open-folder"]', function() {
      var firstScreen;
      self.trigger('openBuilder');
      firstScreen = $(this).attr('data-first-screen');
      if (firstScreen) {
        window.location = '/screen-' + firstScreen + '.html';
      }
      return false;
    });
    this.on('newFolder', function(folder, data) {
      var f;
      f = new FolderModel();
      return f.save({
        name: folder,
        data: data
      }, {
        success: function(model, resp) {
          return mixpanel.track('New Folder Created', null, function() {
            return window.location = '/screen-' + resp.first_screen_id + '.html';
          });

          /*
          console.log 'New folder', model
          $('#folders .projects-used').html(parseInt($('#folders .projects-used').html()) + 1)
          self.currentFolder = model.get('unique_id')
          self.trigger('openBuilder')
          self.addFolder(model)
          $('#project-name').text(model.get('name'))
          window.Jetstrap and window.Jetstrap.builder.trigger('newFolder', model.get('unique_id'))
           */
        },
        error: function(model, response) {
          return window.Account.showTab('billing', 'Please upgrade to create more projects and screens');
        }
      });
    });
    this.on('folderRenamed', function(folder, name) {
      var f;
      f = new FolderModel();
      f.id = folder;
      return f.save({
        name: name
      }, {
        success: function(model, resp) {
          return $('#folders .folder[data-folderid="' + folder + '"] a h3').html(name);
        },
        error: function(resp) {
          return alert('Unable to rename project. Please try again later or contact support@jetstrap.com.');
        }
      });
    });
    this.on('folderDeleted', function(folder) {
      var f;
      f = new FolderModel();
      f.id = folder;
      return f.destroy({
        success: function(model, resp) {
          $('#folders .folder[data-folderid="' + folder + '"]').remove();
          return $('#folders .projects-used').html(parseInt($('#folders .projects-used').html()) - 1);
        },
        error: function(resp) {
          return alert('Unable to delete project. Please try again later or contact support@jetstrap.com.');
        }
      });
    });
    $('.dropdown-toggle').click(function() {
      $(this).next('.dropdown-menu').fadeToggle(50);
      return false;
    });
    $(document).click(function(e) {
      if ($(e.target).closest('#frame-drop').is('#frame-drop')) {
        return;
      }
      return $('.dropdown-menu').fadeOut(50);
    });
    window.Jetstrap && window.Jetstrap.builder.bind('closeBuilder', function() {
      $('.dashboard-view').removeClass('hidden');
      return $('.builder-view').addClass('hidden');
    });

    /*
    @on 'openBuilder', ->
      $('.dashboard-view').addClass('hidden')
      $('.builder-view').removeClass('hidden')
    
    window.Jetstrap.builder.bind 'openBuilder', ->
      $('.dashboard-view').addClass('hidden')
      $('.builder-view').removeClass('hidden')
     */
    return window.Jetstrap && window.Jetstrap.builder.bind('setCurrentFolder', function(id) {
      return self.currentFolder = id;
    });
  };

  DashboardView.prototype.addFolder = function(model) {
    var last_modified;
    last_modified = model.get('last_modified');
    if (last_modified) {
      last_modified = last_modified + ' ago';
    } else {
      last_modified = 'just now';
    }
    return $('#folders ul').append('<li class="folder" data-folderid="' + model.get('unique_id') + '"> <a href="#" data-action="open-folder"> <h3 class="folder-name">' + model.get('name') + '</h3> </a> <div class="bottom clearfix proxima-thin"> <div class="left"> Last active ' + last_modified + '</div> <div class="btn-group dropdown pull-right"> <a class="btn-link dropdown-toggle" data-toggle="dropdown" href="#"> <div class="j-icon j-icon-gear-black"></div> </a> <ul class="dropdown-menu pull-right"> <div class="dropdown-caret"></div> <li class="default rename"><a data-action="rename-folder" href="#"><div class="j-icon j-icon-rename"></div>Rename</a></li> <!--li class="default duplicate"><a data-action="duplicate-folder" href="#"><div class="j-icon j-icon-duplicate"></div>Duplicate</a></li--> <li class="default download"><a target="_blank" href="/api/v1/folder/' + model.get('unique_id') + '/htmlzip"><div class="j-icon j-icon-download"></div>Export Project</a></li> <li class="divider"></li> <li class="default errors delete"><a data-action="delete-folder" href="#"><div class="j-icon j-icon-delete"></div>Delete</a></li> </ul> </div> </div> </li>');
  };

  DashboardView.prototype.setBackground = function(value, repeat) {
    var bodyRepeat, footerRepeat;
    if (repeat) {
      bodyRepeat = "repeat";
      footerRepeat = "repeat-x";
    } else {
      bodyRepeat = "no-repeat";
      footerRepeat = "no-repeat";
    }
    $('body').css('background', "url('https://s3.amazonaws.com/jetstrap-site/images/common/" + value + ".jpg') center bottom " + bodyRepeat + " fixed");
    $('body').css('background-size', "cover");
    $('#footer .dashboard-view').css('background', "url('https://s3.amazonaws.com/jetstrap-site/images/common/" + value + "_footer.jpg') center bottom " + footerRepeat + " transparent");
    $('#footer .dashboard-view').css('background-size', "100% 146px");
    return true;
  };

  return DashboardView;

})(Backbone.View);

window.Dashboard = new DashboardView();
