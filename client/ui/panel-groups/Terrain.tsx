import { useSelector } from "react-redux";
import { useAppDispatch } from "../../state/app/hooks"
import { ClickActionTypes, setClickAction, setGridHighlightType } from "../../state/features/gameControls/gameControlsSlice";
import { MenuButton } from "../elements/Buttons";
import { ButtonGroupCluster } from "../layout-utilities/layout-partials";
import { selectGameControlsState } from "../../state/app/store";

export const Terrain = () => {
  const dispatch = useAppDispatch();
  const currentAction = useSelector(selectGameControlsState).clickAction;
  const buttons: {text: ClickActionTypes, action: () => void}[] = [
    {text: "raise", action: () => {
      dispatch(setClickAction("raise"));
      dispatch(setGridHighlightType("corner"));
    }},
    {text: "lower", action: () => {
      dispatch(setClickAction("lower"));
      dispatch(setGridHighlightType("corner"));
    }},
    {text: "build", action: () => {
      dispatch(setClickAction("build"));
      dispatch(setGridHighlightType("cell"));
    }},
  ]
  return (<>
    <ButtonGroupCluster>
      {buttons.map((button, i) => (
        <MenuButton className={`inverted ${button.text === currentAction ? 'isActive' : ''}`} key={`terrain-option-${i}`} onClick={button.action}>{button.text}</MenuButton>
      ))}
    </ButtonGroupCluster>
  </>)
}