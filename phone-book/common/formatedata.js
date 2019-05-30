var narrList = [];

function arrayHandle(arr) {
    arr.forEach(data => {
      objectHandle(data);
    });
    return arr;
  }
  
  function objectHandle(obj) {
    const items = narrList.filter(data => data.pid === obj.id);
    if (items.length) {
      if (obj.children) {
        obj.children.concat(items);
      } else {
        obj.children = items;
      }
      return arrayHandle(items);
    } else {
      return obj;
    }
  }

//这步将返回构造的数据
function formateData(temp){
	narrList = temp;
	return arrayHandle(temp.filter(data => data.pid === 0));
}

export default formateData;

