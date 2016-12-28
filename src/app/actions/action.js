var actions = {
	//files
	selectChildren(rowNumber) {
		return {
			type: 'SELECT_CHILDREN',
			rowNumber:rowNumber
		}
	},

	selectAllChildren() {
		return {
			type: 'SELECT_ALL_CHILDREN',
		}
	},

	toggleMenu(index,x,y,selected) {
		return {
			type: 'TOGGLE_MENU',
			index : index,
			x: x,
			y: y,
			selected:selected
		}
	},

	openDetail() {
		return {
			type : 'OPEN_DETAIL'
		}
	},

	// cleanDetail() {
	// 	return {
	// 		type: 'CLEAN_DETAIL'
	// 	}
	// },
	//left navigation
	changeSelectedNavItem(name,index) {
		return {
			type: 'NAV_SELECT',
			select: name
		}
	},

	selectedNavItem(name) {
    return {
			type: 'PHOTO_MENU_SELECT',
			name
		};
	},

	createFileInfo(fileInfo) {
		return {
			type: 'CREATE_FILE_INFO',
			fileInfo
		}
	},

	clearFileInfo() {
		return {
			type: 'CLEAR_FILE_INFO'
		}
	},

	// no using
	mouseDown(left,top) {
		return {
			type: 'MOUSE_DOWN',
			left: left,
			top: top
		}
	},

	mouseMove(width,height) {
		return {
			type: 'MOUSE_MOVE',
			width: width,
			height:height
		}
	},

	mouseUp() {
		return {
			type: 'MOUSE_UP'
		}
	},

	addDragImageItem(el, date, index) {
    return {
			type: 'ADD_DRAG_IMAGEITEM',
			el,
			date,
			index
		};
	},

	addDragImageList(els, date) {
		return {
			type: 'ADD_DRAG_IMAGELIST',
			els,
			date
		}
	},

	removeDragImageItem(date, index) {
		return {
      type: 'REMOVE_DRAG_IMAGEITEM',
      date,
      index
    }
	},

	removeDragImageList(date) {
		return {
			type: 'REMOVE_DRAG_IMAGELIST',
			date
		}
	},

	clearDragImageItem() {
		return {
			type: 'CLEAR_DRAG_IMAGEITEM'
		}
	},

	getLargeImageList(largeImageEls, currentThumbIndex, date, hash) {
	  return {
			type: 'LARGE_IMAGE',
			date,
			largeImageEls,
			currentThumbIndex,
			hash
		};
	},

	removeLargeImageList() {
		return {
			type: 'REMOVE_LARGE_IMAGE'
		};
	},

	toggleSelectStatusImageItem(checked) {
    return {
			type: 'TOGGLE_SELECT_STATUS_IMAGEITEM',
			checked
		}
	},

	toggleNavigator(titleTexts) {
		return {
			type: 'TOGGLE_NAVIGATOR',
			titleTexts
		}
	},

	getAlbumHash(hash) {
		return {
			type: 'GET_ALBUM_HASH',
			hash
		};
	},

	removeFile(obj) {
		return {
			type: 'REMOVE',
			obj: obj
		}
	},

	toggleDialogOfUploadFolder(open) {
		return {
			type: 'TOGGLE_DIALOG_FOLDER',
			isOpen: open
		}
	},

	cancelUserCheck() {
		return {
			type:'CANCEL_USER_CHECK',
		}
	},

	refreshStatusOfUpload(tasks) {
		return {
			type: 'REFRESH_STATUS_UPLOAD',
			tasks : tasks
		}
	},

	refreshStatusOfDownload(tasks) {
		return {
			type: 'REFRESH_STATUS_DOWNLOAD',
			tasks : tasks
		}
	},

	setSnack(message,open) {
		return {
			type: 'SET_SNACK',
			text: message,
			open: open
		}
	},

	cleanSnack() {
		return {
			type: 'CLEAN_SNACK'
		}
	},

	toggleMove(open,x,y) {
		return {
			type: 'TOGGLE_MOVE',
			open: open,
			x: x,
			y: y
		}
	},

	setTree(tree) {
		return {
			type: 'SET_TREE',
			tree: tree
		}
	},

	closeMove() {
		return {
			type: 'CLOSE_MOVE'
		}
	},
	//media ---------------------------------------------

	toggleMedia(open) {
		return {
			type: 'TOGGLE_MEDIA',
			open: open
		}
	},

	setMediaImage(item) {
		return {
			type: 'SET_MEDIA_IMAGE',
			item: item
		}
	},

	logOut() {
		return {
			type: 'LOG_OUT'
		}
	},

	adapter(data) {
		return {
			type: 'ADAPTER',
			store: data
		}
	},

	//move data
	setMoveData(data) {
		return {
			type : 'SET_MOVE_DATA',
			data : data
		}
	},

	/**
    v0.2.0
	**/
	changeSelectedPhotoMenuItem(name) {
		return {
			type: 'PHOTO_MENU_SELECT',
			select: name
		};
	}

	// transimission

}

module.exports = actions;
