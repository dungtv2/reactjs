import React, { Component } from 'react';
import { Pp } from './Base.js'
import U from 'react-addons-update';
import classNames from 'classnames';
import {string, object, bool} from 'prop-types';

class FieldChar extends Component {
    constructor(props){
        super(props);
    }
    render() {
        var field = this.props.field;
        var attr = {defaultValue: field.value || field.default}
        if (field.readOnly){
            attr.readOnly = field.readOnly;
        }
        return (
            <div style={{padding: "5px 15px 5px 0px"}}>
                {field.display === 'block' ? <label style={{fontWeight: "bold"}}>{field.string}</label> : ""}
                <input style={{width: "100%"}} id={field.name} type="input" {...attr} placeholder={field.placeholder}/>
            </div>
        )
    }
}

class TextArea extends Component {
    render() {
        var field = this.props.field;
        return (
            <div className="form-group">
                <label for={field.name}>{field.string}</label>
                <textarea className="form-control" rows="5" id={field.name} placeholder={field.placeholder}></textarea>
            </div>
        )
    }
}
class Selection extends Component {
    __onBeforeRender(){
        this.field = this.props.field;
    }
    render() {
        return (
            <div></div>
        )
    }
}


class FormFooter extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (<div></div>);
    }
}

FormFooter = Pp(FormFooter);

class ButtonBar extends Component {
    constructor(props){
        super(props);
    }
    renderButton = () => {
        return this.app.FormView.data;
    }
    render(){
        return (
            <div className="app-form-button-bar">
                {this.renderButton()}
            </div>
        )
    }
}

ButtonBar = Pp(ButtonBar);

class StateBar extends Component {
    constructor(props){
        super(props);
    }
    render_view = () => {
        var field = this.app.FormView.field;
        if (field.state && field.state.selection){
            return  <ul className="app-form-state-bar">
                        {Object.keys(field.state.selection).map((k) =>
                            <li k={k} className={classNames(k === field.state.default ? "active" : "")}>
                                {field.state.selection[k]}
                            </li>
                        )}
                    </ul>
        }
    }
    render() {
        return (
            <div>
                {this.render_view()}
            </div>
        )
    }
}

StateBar = Pp(StateBar);

class FormHeader extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-form-header">
                <ButtonBar app={this.app} />
                <StateBar app={this.app} />
            </div>
        );
    }
}

FormHeader = Pp(FormHeader)

class FormSheet extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-form-sheet">
                <div className="app-view-form form-horizontal container">
                    {this.app.FormView.render_master_view()}
                    {this.app.FormView.render_tabs_view()}
                </div>
            </div>
        )
    }
}

FormSheet = Pp(FormSheet)

class Group extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let group = this.props.group || {};
        return (<table style={{float: "left", width: (this.props.width || 100)+"%"}}>
                    <tbody>
                        {group.label ?
                            <tr>
                                <td colSpan={2}>
                                    <label className="app-group-title">{group.label}</label>
                                </td>
                            </tr> : ""}
                        {this.props.fields.map((field) =>
                            <tr key={field.name}>
                                <td className="app-group-label">{field.display != 'block' ? field.string : ""}</td>
                                <td>{this.app.FormView.render_field(field)}</td>
                            </tr>)}
                    </tbody>
                </table>
        );
    }
}

Group = Pp(Group);

class Tab extends Component{
    constructor(props){
        super(props);
    }
    _render_group_in_tab = (tab_key, group_key) => {
        /*
        * @param: - tab_key: key of tab
        *         - group_key: key of group
        * @description: This function render group in tab
        * */
        var field_tab = this.app.FormView.field_tab;
        if (field_tab.hasOwnProperty(tab_key) && field_tab[tab_key].hasOwnProperty(group_key)){
            return <Group key={tab_key+group_key} app={this.app}
                          fields={field_tab[tab_key][group_key]}
                          width={100/this.tabs[tab_key].col || 100}
                          group={this.tabs[tab_key].groups[group_key]} />
        }
    }
    _render_field_no_group = (tab_key) => {
        // field no group always always render bottom
        var field_tab = this.app.FormView.field_tab;
        if (field_tab.hasOwnProperty(tab_key) && field_tab[tab_key].__no_group){
            return <Group app={this.app} fields={field_tab[tab_key].__no_group}/>
        }
    }
    render(){
        this.tabs = this.props.tabs;
        return (
            <div>
                <ul className="nav nav-tabs app-form-nav-tabs">
                    {Object.keys(this.tabs).map((k)=>
                        <li key={k} className={classNames(this.tabs[k].active)}>
                            <a data-toggle="tab" href={"#"+k}>{this.tabs[k].label}</a>
                        </li>
                    )}
                </ul>
                <div className="tab-content app-form-tab-content">
                    {Object.keys(this.tabs).map((tab)=>
                        <div key={tab} id={tab} className={classNames("tab-pane fade", this.tabs[tab].active === "active" ? "in active" : "")}>
                            {Object.keys(this.tabs[tab].groups || {}).map((group) => this._render_group_in_tab(tab, group))}
                            {this._render_field_no_group(tab)}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

Tab = Pp(Tab);

class FormView extends Component {
    constructor(props) {
        super(props);
    }
    render_field = (field) => {
        var html = "";
        let input = new Set();
        let select = new Set();
        let text = new Set();
        input.add("input").add("password").add("integer").add("int").add("email");
        select.add("selection").add("select");
        text.add("text").add("textarea");
        if (input.has(field.type)) {
            html = <FieldChar key={field.name} app={this.app} field={field}/>;
        } else if (select.has(field.type)) {
            html = <Selection key={field.name} app={this.app} field={field}/>;
        } else if (text.has(field.type)) {
            html = <TextArea key={field.name} app={this.app} field={field}/>;
        }
        return html;
    }
    render_tabs_view = () =>{
        if (this.data.props.tabs){
            return <Tab app={this.app} tabs={this.data.props.tabs} />
        }
    }
    render_master_view = () => {
        let __no_group = null;
        if (this.field_master.__no_group){
            __no_group = <Group width={100} app={this.app} fields={this.field_master.__no_group} />;
            delete this.field_master.__no_group;
        }
        var master_view = Object.keys(this.field_master).map((k) => <Group key={k} width={100/this.data.props.master.col || 100}
                                                                           app={this.app} fields={this.field_master[k]} />)
        master_view.push(__no_group);
        return master_view;
    }
    __fill_field = () => {
        for (let k of Object.keys(this.field)) {
            let field = this.field[k];
            if (field.tab){// push field tab to field_tab
                if (this.field_tab.hasOwnProperty(field.tab)){
                    if (field.group){
                        if (this.field_tab[field.tab].hasOwnProperty(field.group)){
                            this.field_tab[field.tab][field.group].push(field);
                        }else{
                            this.field_tab[field.tab][field.group] = [field]
                        }
                    }else{
                        if (this.field_tab[field.tab].__no_group){
                            this.field_tab[field.tab].__no_group.push(field);
                        }else{
                            this.field_tab[field.tab].__no_group = [field];
                        }
                    }
                }else {
                    this.field_tab[field.tab] = {};
                    if (field.group) {
                        this.field_tab[field.tab][field.group] = [field];
                    }else{
                        if (this.field_tab[field.tab].__no_group){
                            this.field_tab[field.tab].__no_group.push(field);
                        }else{
                            this.field_tab[field.tab].__no_group = [field];
                        }
                    }
                }
            }else if(this.data.props.master.groups && field.group) { // push field to master
                if (this.field_master.hasOwnProperty(field.group)) {
                    this.field_master[field.group].push(field);
                } else {
                    this.field_master[field.group] = [field];
                }
            }else {
                if(this.field_master.__no_group){
                    this.field_master.__no_group.push(field);
                }else{
                    this.field_master.__no_group = [field];
                }

            }
        }
    }
    __onBeforeRender(){
        this.data = this.props.app.App.model_data[this.props.app.App.state.current_child_menu];
        this.field = this.data.props.field;
        this.field_tab = {};
        this.field_master = {};
        this.form_type = this.props.app.App.form_type;
        this.type = this.props.app.App.state.form_type;
        this.__fill_field();
    }
    render() {
        return (
            <div>
                <FormHeader app={this.app} />
                <FormSheet app={this.app} />
                <FormFooter app={this.app} />
            </div>
        )
    }
}

class TreeView extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="app-view-tree">
                <table>
                    <TreeHead app={this.app} />
                    <TreeBody app={this.app} />
                    <TreeFoot app={this.app} />
                </table>
            </div>
        )
    }
}

class TreeHead extends Component {
    constructor(props){
        super(props)
        this.data = {id: "Order Number", name: "Order Date", age: "Customer", country: "Salesperson"}
    }
    render() {
        return (
            <thead>
                <TreeRow item={this.data} app={this.app} isHeader={true} />
            </thead>
        )
    }
}

class TreeBody extends Component {
    constructor(props){
        super(props)
        this.data = [{id: 1, name: "ABC", age: 23, country: "Việt Nam"},
                     {id: 2, name: "DEF", age: 32, country: "Việt Nam"}]
    }
    render() {
        return (
            <tbody>
                {this.data.map((item) => <TreeRow key={item.id} app={this.app} item={item} />)}
            </tbody>
        )
    }
}

class TreeRow extends Component {
    constructor(props){
        super(props)
    }
    onClickItem() {
        this.app.App.changeState(U(this.app.App.state, {active_id: {$set: this.data.id},
                                                        current_view: {$set: "form"}, form_type: {$set: "view"}}));
        // this.app.Application.change_view_manager("form")
    }
    __onBeforeRender(){
        this.data = this.props.item;
    }
    render() {
        return (
            <tr ref={(row) => this.$el = row} onClick={this.onClickItem.bind(this)}>
                <th><input type="checkbox" /></th>
                {Object.keys(this.data).map((k) => <td key={k}>{this.data[k]}</td>)}
            </tr>
        )
    }
}

class TreeFoot extends Component {
    render() {
        return (
            <tfoot>

            </tfoot>
        )
    }
}

module.exports = {TreeView: Pp(TreeView), FormView: Pp(FormView), TreeBody: Pp(TreeBody), TreeFoot: Pp(TreeFoot),
    TreeHead: Pp(TreeHead), TreeRow: Pp(TreeRow)}