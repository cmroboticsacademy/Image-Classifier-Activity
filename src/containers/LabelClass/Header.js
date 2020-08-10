import React, { useState } from 'react';
import { FaEdit, FaCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import MenuSelect from '../../components/MenuSelect';
import {
  deleteLabelClass,
  setLabelClassName,
  setLabelClassColor,
  deleteAllImages,
  toggleDisposeState,
} from '../../redux/actions/labelClasses';
import ColorSelector from '../../components/ColorSelector';
import { deleteExamples } from '../../shared/image_classifier';

const Header = ({ labelClass }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const menuOptions = [
    [
      'Delete Class',
      () => {
        deleteExamples(labelClass.name);
        dispatch(deleteLabelClass(labelClass.id));
      },
    ],
    [
      'Remove All Images',
      () => {
        deleteExamples(labelClass.name);
        dispatch(deleteAllImages(labelClass.id));
      },
    ],
  ];

  const handleUpdate= (e) => {
    toggleEdit();
    dispatch(setLabelClassName(labelClass.id, e.target.value));
  };

  const toggleEdit = (e) => {
    setEdit(!edit);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      setEdit(false);
      handleUpdate(e);
    }
  };

  return (
    <div className="panel--round__header flex-row-container flex-justify-between ">
      <div className="flex-row-container">
        <ColorSelector
          colorSetter={(id, color) => dispatch(setLabelClassColor(id, color))}
          backgroundColor={labelClass.color.hex}
          id={labelClass.id}
        />

        <button className="edit-title-btn" onClick={toggleEdit}>
          <FaEdit/>
        </button>

        { edit ? (
          <input
            autoFocus
            onKeyPress={handleEnter}
            type="text"
            id="name"
            onBlur={handleUpdate}
          />
        ) : (
          <b className="class-title">{labelClass.name}</b>
        )}
      </div>

      <div className="flex-row-container">
        <label className="toggle-label-static">
          Mark items in this category:
        </label>
        <button
          className={labelClass.dispose ? 'toggle-btn__dispose' : 'toggle-btn__keep'}
          onClick={() => dispatch(toggleDisposeState(labelClass.id))}>
          <FaCircle/>
        </button>
        <label className="toggle-label">
          {labelClass.dispose ? 'DEFECT' : 'OK'}
        </label>
        <MenuSelect options={menuOptions}/>

      </div>

    </div>
  );
};

export default Header;
