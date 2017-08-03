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
    }
    // get_kind(){
    //     var field = this.props.field;
    //     var html = <div></div>;
    //     if (this) {
    //         html =<div className="form-group">
    //             <label className="control-label col-sm-2" for={field.name}>{field.label}</label>
    //             <div className="col-sm-10">
    //                 <input type={field.name} className="form-control" id={field.name} placeholder={field.placeholder}/>
    //             </div>
    //         </div>
    //     }else if(this){
    //         html = <div className="form-group">
    //             <div className="col-xs-4">
    //                 <label for={field.name}>{field.label}</label>
    //                 <input className="form-control" id={field.name} type={field.name} placeholder={field.placeholder} />
    //             </div>
    //         </div>
    //     }else if(this) {
    //         html = <div className="form-group">
    //             <label for={field.name}>{field.label}</label>
    //             <input type={field.name} className="form-control" id={field.name} placeholder={field.placeholder}/>
    //             <span className="help-block">This is some help text...</span>
    //         </div>
    //     }
    // }
    render() {
        var field = this.props.field;
        return (
            <div className="form-group">
                <div className="col-xs-6">
                    <label for={field.name}>{field.string}</label>
                    {field.readOnly ?
                        <input readOnly="true" className="form-control" id={field.name}
                               type={field.name}
                               value={field.hasOwnProperty("value") ? field.value : ""}
                               placeholder={field.placeholder}/> :
                        <input className="form-control" id={field.name}
                               type={field.name}
                               value={field.hasOwnProperty("value") ? field.value : ""}
                               placeholder={field.placeholder}/>
                    }
                </div>
            </div>
        )
    }
}
class TextArea extends React.Component {
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
class Selection extends React.Component {
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
                            <label>{this.tabs[k].label}</label>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

class FormView extends Component {
    constructor(props) {
        super(props);
        this.render_field = this.render_field.bind(this);
    }
    render_field(field){
        var html = "";
        if (field.hasOwnProperty("tab")){

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
            html = <Tab key= tabs={this.data.tabs} />
        }
        return html;
    }
    __onBeforeRender(){
        var App = this.props.app.App;
        this.data = this.props.app.App.model_data[this.props.app.App.state.current_child_menu];
        this.title = this.data.title;
        this.field = this.data.field;
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

class TreeView extends React.Component {
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