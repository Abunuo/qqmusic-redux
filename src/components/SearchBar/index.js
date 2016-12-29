/**
 * Created by jiawei6 on 2016/11/23.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Observable} from 'rxjs/Observable';

import {searchActions} from '../../core/search';
import {nagivateActions} from '../../core/navigate';
import SearchOtherItem from './SearchOtherItem';
import SearchResultItem from './SearchResultItem';

import './SearchBar.css';

class SearchBar extends React.Component {
	static propTypes = {
		search: PropTypes.object.isRequired
	};

	constructor() {
		super(...arguments);
		this.handleInput = this.handleInput.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	handleInput() {
		const value = this.input.value.trim();
		const {loadSearchSuggest, search: {lastQuery, suggest, hot}, loadSearchHot} = this.props;
		if (value !== '') { //在有输入的情况下加载数据
			loadSearchSuggest(value, lastQuery, !!suggest);
		} else {
			loadSearchHot(!!hot);
		}
	}

	handleBtnClick() {
		const value = this.input.value.trim();
		const {navigateToSearch, search: {lastSearch}} = this.props;
		if (value !== '') { //在有输入的情况下跳转
			navigateToSearch('song', value, lastSearch);
		}
	}

	handleFocus() {
		const value = this.input.value.trim();
		const {loadSearchSuggest, loadSearchHot, search: {lastQuery, suggest, hot}} = this.props;

		if (value !== '') {
			loadSearchSuggest(value, lastQuery, !!suggest);
		} else {
			loadSearchHot(!!hot);
		}
	}

	handleBlur() {
		this.props.hideSuggestBox();
	}

	componentDidMount() {
		Observable.fromEvent(this.input, 'input')
			.debounceTime(200)
			.subscribe(() => {
				this.handleInput();
			})
	}

	/**
	 * 渲染suggest搜索结果box
	 * @returns {XML}
	 */
	renderSuggestBox() {
		const {search: {showSuggestBox, hot, suggest, lastSearch}} = this.props;
		let child = null;
		if (showSuggestBox) {
			switch (showSuggestBox) {
				case 'result':
					if (suggest) {
						const resultChilds = [];
						suggest.mapKeys((key, value) => {
							if (value.get('itemlist').size) {
								resultChilds.push(
									<div className="search_result_sort" key={key}>
										<h4 className="search_result_tit">
											<i className={`search_result_icon_${key}`}/>
											{value.get('name')}
										</h4>
										<ul>
											{
												value.get('itemlist').map((item, index) => {
													return (
														<SearchResultItem key={index} type={key} {...item.toJS()}/>
													)
												})
											}
										</ul>
									</div>
								)
							}
						});
						child =
							<div className="search_result_box">
								{resultChilds}
							</div>;
					}
					break;
				case 'other':
					if (hot) {
						const hotkeys = hot.get('hotkey').slice(0, 5);
						child =
							<div className="search_other_box">
								<ul>
									{
										hotkeys.map((hotkey, index) => {
											return (
												<SearchOtherItem query={hotkey.get('k')} key={index} lastSearch={lastSearch}/>
											)
										})
									}
								</ul>
							</div>;
					}
					break;
				default:
					break;
			}
			return (
				<div className="search_suggest_box">
					{child}
				</div>
			)
		} else {
			return null;
		}
	}

	render() {
		return (
			<div className="search_bar_wrap">
				<div className="search_bar">
					<input
						className="search_bar_input"
						type="text"
						autoComplete="off"
						maxLength="60"
						placeholder="搜索单曲、专辑、MV、歌手"
						tabIndex="0"
						//onInput={this.handleInput}
						onFocus={this.handleFocus}
						onBlur={this.handleBlur}
						ref={e => this.input = e}
					/>
					<button className="search_bar_btn" onClick={this.handleBtnClick}>
						<i className="search_bar_btn_icon"/>
					</button>
				</div>
				{this.renderSuggestBox()}
			</div>
		)
	}
}

const mapDispatchToProps = {
	loadSearchSuggest: searchActions.loadSearchSuggest,
	loadSearchHot: searchActions.loadSearchHot,
	navigateToSearch: nagivateActions.navigateToSearch,
	hideSuggestBox: searchActions.hideSuggestBox
};

export default connect(
	null,
	mapDispatchToProps
)(SearchBar);