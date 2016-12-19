/**
 * Created by jiawei6 on 2016/12/6.
 */
import React from 'react';

export function entityReplace(str) {
	return str.replace(/&#38;?/g, "&amp;")
		.replace(/&amp;/g, "&")
		.replace(/&#(\d+);?/g, function(t, e) {
			return String.fromCharCode(e)
		})
		.replace(/´/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&acute;/gi, "'")
		.replace(/&nbsp;/g, " ")
		.replace(/&#13;/g, "\n")
		.replace(/(&#10;)|(&#x\w*;)/g, "")
		.replace(/&amp;/g, "&");
}

export function lightKeyword(str, keyword) {
	if (!keyword) {
		return str;
	} else if (str === keyword) {
		return <span>{keyword}</span>;
	} else {
		const arr = str.split(keyword);
		for (let i = 0, len = arr.length - 1; i < len; i++) {
			arr.splice(i * 2 + 1, 0, <span key={i}>{keyword}</span>)
		}
		return arr;
	}
}

export function time2Min(time) {
	let min = Math.floor(time / 60);
	let sec = Math.floor(time % 60);
	min < 10 && (min = '0' + min);
	sec < 10 && (sec = '0' + sec);
	return min + ':' + sec;
}

export function getPathLastFromProps(props) {
	const {location: {pathname}} = props;
	const paths = pathname.split('/');
	return paths[paths.length - 1];
}