const key="repairwave.user";

export function getUser(attribute){
	var user=localStorage.getItem(key);
	if (user==null){
		return user;
	}else{
		user=JSON.parse(user);
	}

	return user[attribute] || null;
}

export function setUser(attribute,value){
	var user=localStorage.getItem(key);
	if (user==null){
		user={};
	}else{
		user=JSON.parse(user);
	}

	user[attribute]=value;

	localStorage.setItem(key, JSON.stringify(user));
}

export function clearUser(){
	localStorage.removeItem(key);
}
