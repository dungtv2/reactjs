import React, { Component } from 'react';
import { Pp } from './Base.js'
import U from 'react-addons-update';
import classNames from 'classnames';

class FieldChar extends Component {
    constructor(props){
        super(props);
        // this.kind = new Set();
        // this.kind.add("default").add("help").add("sizing");
        // this.get_kind = this.get_kind.bind(this);
        //
        // <div className="form-group">
        //     <div className="col-xs-6">
        //         <label for={field.name}>{field.string}</label>
        //         {field.readOnly ?
        //             <input readOnly="true" id={field.name}
        //                    type={field.name}
        //                    value={field.hasOwnProperty("value") ? field.value : ""}
        //                    placeholder={field.placeholder}/> :
        //             <input id={field.name}
        //                    type={field.name}
        //                    value={field.hasOwnProperty("value") ? field.value : ""}
        //                    placeholder={field.placeholder}/>
        //         }
        //     </div>
        // </div>
    }
    render() {
        var field = this.props.field;
        return (
            <div style={{padding: "5px 15px 5px 0px"}}>
                    {field.hasOwnProperty("tab") ? "" : <label style={{fontWeight: "bold"}}>{field.string}</label>}
                    {field.readOnly ?
                        <input style={{width: "100%"}} readOnly="true" id={field.name}
                               type={field.name}
                               value={field.hasOwnProperty("value") ? field.value : ""}
                               placeholder={field.placeholder}/> :
                        <input style={{width: "100%"}} id={field.name}
                               type={field.name}
                               value={field.hasOwnProperty("value") ? field.value : ""}
                               placeholder={field.placeholder}/>
                    }
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

class Tab extends Component{
    constructor(props){
        super(props);
    }
    _render_group_in_tab(tab, group_key, group){
        var field_tab = this.app.FormView.field_tab;
        if (field_tab.hasOwnProperty(tab)){
            if (field_tab[tab].hasOwnProperty(group_key)){
                let fields = field_tab[tab][group_key];
                return  <table style={{float: "left", width: "50%"}}>
                            <tr>
                                <td colSpan={2}><label className="app-group-title">{group.label}</label></td>
                            </tr>
                            {fields.map((field) =>
                                <tr>
                                    <td style={{fontWeight: "bold"}}>{field.string}</td>
                                    <td>{this.app.FormView.render_field(field, true)}</td>
                                </tr>
                            )}
                        </table>
            }
        }
    }
    render(){
        this.tabs = this.props.tabs;
        return (
            <div>
                <ul className="nav nav-tabs">
                    {Object.keys(this.tabs).map((k)=>
                        <li key={k} className={classNames(this.tabs[k].active)}>
                            <a data-toggle="tab" href={"#"+k}>{this.tabs[k].label}</a>
                        </li>
                    )}
                </ul>
                <div className="tab-content">
                    {Object.keys(this.tabs).map((k)=>
                        <div k={k} id={k} className={classNames("tab-pane fade", this.tabs[k].active === "active" ? "in active" : "")}>
                            {Object.keys(this.tabs[k].groups || {}).map((g_k) => this._render_group_in_tab.bind(this)(k, g_k, this.tabs[k].groups[g_k]))}
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
        this.render_field = this.render_field.bind(this);
    }
    render_field(field, force_tab=false){
        var html = "";
        if (field.hasOwnProperty("tab") && !force_tab){
            if (this.field_tab.hasOwnProperty(field.tab)){
                if (this.field_tab[field.tab].hasOwnProperty(field.group)){
                    this.field_tab[field.tab][field.group].push(field);
                }else{
                    this.field_tab[field.tab][field.group] = [field]
                }
            }else {
                this.field_tab[field.tab] = {};
                this.field_tab[field.tab][field.group] = [field];
            }
        }else {
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
        }
        return html;
    }
    render_tabs(){
        var html = "";
        if (this.data.hasOwnProperty("tabs")){
            html = <Tab app={this.app} tabs={this.data.tabs} />
        }
        return html;
    }
    __onBeforeRender(){
        var App = this.props.app.App;
        this.data = this.props.app.App.model_data[this.props.app.App.state.current_child_menu];
        this.title = this.data.title;
        this.field = this.data.field;
        this.field_tab = {};
        this.form_type = App.form_type;
        this.type = this.props.app.App.state.form_type;
        const active_id = App.state.active_id;
        if (active_id){
            const value = this.props.app.App.data_form[active_id];
            for (let k of Object.keys(this.field)){
                if (value.hasOwnProperty(k)){
                    this.field[k]['value'] = value[k];
                }
                if (this.type === this.form_type.view){
                    this.field[k]['readOnly'] = true;
                }else{
                    delete this.field[k].readOnly;
                }
            }
        }
    }
    render() {
        return (
            <div className="app-view-form form-horizontal container">
                {Object.keys(this.field).map((k) => this.render_field(this.field[k]))}
                {this.render_tabs.bind(this)()}
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

class TreeFoot extends React.Component {
    render() {
        return (
            <tfoot>

            </tfoot>
        )
    }
}

module.exports = {TreeView: Pp(TreeView), FormView: Pp(FormView), TreeBody: Pp(TreeBody), TreeFoot: Pp(TreeFoot),
    TreeHead: Pp(TreeHead), TreeRow: Pp(TreeRow)}