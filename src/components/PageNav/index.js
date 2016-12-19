/**
 * Created by jiawei6 on 2016/12/5.
 */
import React, {PropTypes} from 'react';

import './PageNav.css';

export const PageNav = ({curpage, totalpage, handleNavClick}) => {
	const num = 3;
	const navs = [];

	if (totalpage > 1 && curpage !== 1) { // 左尖括号
		navs.push(
			<a key='lt' onClick={handleNavClick} value={"prev"}><span value={"prev"}>&lt;</span></a>
		);
	}

	if (curpage - num === 1) { // 不需要...
		navs.push(
			<a key={1} onClick={handleNavClick} value={1}>1</a>
		);
	} else if (curpage - num > 1) { // 需要...
		navs.push(
			<a key={1} onClick={handleNavClick} value={1}>1</a>
		);
		navs.push(
			<strong key='...1'>...</strong>
		);
	}

	// 加入curpage前后num-1页标签
	for (let i = 1; i <= totalpage; i++) {
		if (Math.abs(curpage - i) < num && curpage !== i) {
			navs.push(
				<a key={i} onClick={handleNavClick} value={i}>{i}</a>
			);
		} else if (curpage === i) {
			navs.push(
				<strong key={i} className="current" value={i}>{i}</strong>
			);
		}
	}

	if (curpage + num === totalpage) { // 不需要...
		navs.push(
			<a key={totalpage} onClick={handleNavClick} value={totalpage}>{totalpage}</a>
		);
	} else if (curpage + num < totalpage) { // 需要...
		navs.push(
			<strong key="...2">...</strong>
		);
		navs.push(
			<a key={totalpage} onClick={handleNavClick} value={totalpage}>{totalpage}</a>
		);
	}

	if (totalpage > 1 && curpage !== totalpage) { // 右尖括号
		navs.push(
			<a key="gt" onClick={handleNavClick} value={"next"}><span value={"next"}>&gt;</span></a>
		);
	}

	return (
		<div className="page_nav">
			{navs}
		</div>
	)
};

PageNav.propTypes = {
	curpage: PropTypes.number.isRequired,
	totalpage: PropTypes.number.isRequired,
	handleNavClick: PropTypes.func.isRequired
};

export default PageNav;