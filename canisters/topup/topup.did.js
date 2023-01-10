export const idlFactory = ({ IDL }) => {
  const TopUp = IDL.Service({ 'topUp' : IDL.Func([], [], []) });
  return TopUp;
};
export const init = ({ IDL }) => { return [IDL.Text, IDL.Vec(IDL.Text)]; };
