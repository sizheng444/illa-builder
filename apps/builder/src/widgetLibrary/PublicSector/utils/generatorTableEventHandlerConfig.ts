import i18n from "@/i18n/config"
import { EventHandlerPanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const generatorTableEventHandlerConfig = (
  baseWidgetName: string,
  events: { label: string; value: string }[] = [],
  labelName: string = i18n.t("editor.inspect.setter_label.event_handler"),
  attrName: string = "events",
  defaultValue?: string,
): EventHandlerPanelConfig => {
  return {
    id: `${baseWidgetName}-interaction-event-handler`,
    attrName: attrName,
    labelName: labelName,
    setterType: "EVENT_HANDLER_SETTER",
    useCustomLayout: true,
    defaultValue: defaultValue,
    eventHandlerConfig: { events, methods: [] },
    childrenSetter: [
      {
        id: `${baseWidgetName}-interaction-event-handler-event`,
        labelName: i18n.t("editor.inspect.setter_label.event"),
        setterType: "BASE_SELECT_SETTER",
        attrName: "eventType",
        options: events,
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-action`,
        labelName: i18n.t("editor.inspect.setter_label.action"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.action"),
        setterType: "EVENT_ACTION_SELECT_SETTER",
        attrName: "actionType",
        options: [
          {
            label: i18n.t("editor.inspect.setter_label.trigger_query"),
            value: "datasource",
          },
          {
            label: i18n.t("editor.inspect.setter_label.control_component"),
            value: "widget",
          },
          {
            label: i18n.t("editor.inspect.setter_label.go_to_url"),
            value: "openUrl",
          },
          {
            label: i18n.t("editor.inspect.setter_label.show_notification"),
            value: "showNotification",
          },
          {
            label: i18n.t("editor.inspect.setter_label.set_router"),
            value: "setRouter",
          },
        ],
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-query`,
        labelName: "Query",
        setterType: "EVENT_TARGET_ACTION_SELECT_SETTER",
        attrName: "queryID",
        bindAttrName: ["actionType"],
        shown: (type) => type === "datasource",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-actionMethod`,
        labelName: i18n.t("editor.inspect.setter_label.method"),
        setterType: "BASE_SELECT_SETTER",
        attrName: "widgetMethod",
        bindAttrName: ["queryID"],
        shown: (type) => type === "datasource",
        options: [{ label: "run", value: "executeAction" }],
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-component`,
        labelName: i18n.t("editor.inspect.setter_label.component"),
        setterType: "EVENT_TARGET_SELECT_SETTER",
        attrName: "widgetID",
        bindAttrName: ["actionType"],
        shown: (type) => type === "widget",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-Method`,
        labelName: i18n.t("editor.inspect.setter_label.method"),
        setterType: "EVENT_WIDGET_METHOD_SELECT_SETTER",
        attrName: "widgetMethod",
        bindAttrName: ["widgetID"],
        shown: (widgetID) => !!widgetID,
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-Value`,
        labelName: i18n.t("editor.inspect.setter_label.value"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.table_set_value"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "widgetTargetValue",
        bindAttrName: ["widgetMethod"],
        shown: (widgetMethod) => widgetMethod === "setValue",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-startValue`,
        labelName: i18n.t("editor.inspect.setter_label.start_date"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "widgetTargetValue",
        bindAttrName: ["widgetMethod"],
        shown: (widgetMethod) => widgetMethod === "setStartValue",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-endValue`,
        labelName: i18n.t("editor.inspect.setter_label.end_date"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "widgetTargetValue",
        bindAttrName: ["widgetMethod"],
        shown: (widgetMethod) => widgetMethod === "setEndValue",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-imageUrl`,
        labelName: i18n.t("editor.inspect.setter_label.value"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "widgetTargetValue",
        bindAttrName: ["widgetMethod"],
        shown: (widgetMethod) => widgetMethod === "setImageUrl",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-disabled`,
        labelName: i18n.t("editor.inspect.setter_label.disabled"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "disabled",
        bindAttrName: ["type"],
        useCustomLayout: true,
        openDynamic: true,
        shown: (type) => type === "widget",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-script`,
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "script",
        bindAttrName: ["actionType"],
        expectedType: VALIDATION_TYPES.STRING,
        shown: (type) => type === "script",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-URL`,
        labelName: "URL",
        labelDesc: i18n.t("editor.inspect.setter_tooltip.table_set_value"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "url",
        bindAttrName: ["actionType"],
        expectedType: VALIDATION_TYPES.STRING,
        shown: (type) => type === "openUrl",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-newTab`,
        labelName: i18n.t("editor.inspect.setter_label.new_tab"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "newTab",
        bindAttrName: ["actionType"],
        useCustomLayout: true,
        openDynamic: true,
        shown: (type) => type === "openUrl",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-setCurrentViewKey`,
        labelName: i18n.t("editor.inspect.setter_label.key"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "key",
        bindAttrName: ["widgetMethod"],
        shown: (type) => type === "setCurrentViewKey",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-setCurrentViewIndex`,
        labelName: i18n.t("editor.inspect.setter_label.index"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
        attrName: "index",
        bindAttrName: ["widgetMethod"],
        shown: (type) => type === "setCurrentViewIndex",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-showNextView`,
        labelName: i18n.t("editor.inspect.setter_label.loop_back_to_start"),
        setterType: "SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "showNextViewLoopBack",
        bindAttrName: ["widgetMethod"],
        shown: (type) => type === "showNextView",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-showNextVisibleView`,
        labelName: i18n.t("editor.inspect.setter_label.loop_back_to_start"),
        setterType: "SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "showNextVisibleViewLoopBack",
        bindAttrName: ["widgetMethod"],
        shown: (type) => type === "showNextVisibleView",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-showPreviousView`,
        labelName: i18n.t("editor.inspect.setter_label.loop_start_to_back"),
        setterType: "SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "showPreviousViewLoopBack",
        bindAttrName: ["widgetMethod"],
        shown: (type) => type === "showPreviousView",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-showPreviousVisibleView`,
        labelName: i18n.t("editor.inspect.setter_label.loop_start_to_back"),
        setterType: "SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "showPreviousVisibleViewLoopBack",
        bindAttrName: ["widgetMethod"],
        shown: (type) => type === "showPreviousVisibleView",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-title`,
        labelName: i18n.t("editor.inspect.setter_label.title"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "title",
        bindAttrName: ["actionType"],
        expectedType: VALIDATION_TYPES.STRING,
        shown: (type) => type === "showNotification",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-description`,
        labelName: i18n.t("editor.inspect.setter_label.description"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "description",
        bindAttrName: ["actionType"],
        shown: (type) => type === "showNotification",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-notification-type`,
        labelName: i18n.t("editor.inspect.setter_label.type"),
        setterType: "BASE_SELECT_SETTER",
        attrName: "notificationType",
        bindAttrName: ["actionType"],
        shown: (type) => type === "showNotification",
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.message_type.success",
            ),
            value: "success",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.message_type.error",
            ),
            value: "error",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.message_type.warning",
            ),
            value: "warning",
          },
          {
            label: i18n.t(
              "editor.inspect.setter_default_value.message_type.info",
            ),
            value: "info",
          },
        ],
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-page`,
        labelName: i18n.t("editor.inspect.setter_label.page"),
        setterType: "EVENT_TARGET_PAGE_SELECT_SETTER",
        placeholder: i18n.t(
          "editor.inspect.setter_content.select_page_setter.placeholder",
        ),
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "pagePath",
        bindAttrName: ["actionType"],
        shown: (type) => type === "setRouter",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-view-path`,
        labelName: i18n.t("editor.page.label_name.view_path"),
        placeholder: i18n.t(
          "editor.inspect.setter_content.select_view_setter.placeholder",
        ),
        setterType: "EVENT_TARGET_VIEW_PATH_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "viewPath",
        bindAttrName: ["actionType"],
        shown: (type) => type === "setRouter",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-duration`,
        labelName: `${i18n.t("editor.inspect.setter_label.duration")}(ms)`,
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        attrName: "duration",
        bindAttrName: ["actionType"],
        expectedType: VALIDATION_TYPES.NUMBER,
        placeholder: "{{4500}}",
        shown: (type) => type === "showNotification",
      },
      {
        id: `${baseWidgetName}-interaction-event-handler-enabled`,
        labelName: i18n.t("editor.inspect.setter_label.only_run_when"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.table_only_run_when"),
        setterType: "TABLE_MAPPED_VALUE_INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        attrName: "enabled",
      },
    ],
  }
}
