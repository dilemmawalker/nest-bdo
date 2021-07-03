class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>>final_ans=new ArrayList<>();
        ArrayList<Integer>ans=new ArrayList<>();
        solve(k,n,1,0,0,ans,final_ans);
        return final_ans;
    }
    public void solve(int k,int n,int idx,int id,int sum,ArrayList<Integer>ans,List<List<Integer>>final_ans){
        if(sum==n && id==k){
            ArrayList<Integer>temp=new ArrayList<>();
            temp.addAll(ans);
            final_ans.add(temp);
            return;
        }
        if(sum>n || id>=k+1){
            return;
        }

        for(int i=idx;i<=9;i++){
            ans.add(i);
            solve(k,n,i+1,id+1,sum+i,ans,final_ans);
            ans.remove(ans.size()-1);
        }

    }
}