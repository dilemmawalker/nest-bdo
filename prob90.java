public class Solution {
    public List<List<Integer>> subsetsWithDup(int[] arr) {
        Arrays.sort(arr);
        int n=arr.length;
        List<List<Integer>>final_ans=new ArrayList<>();
        // final_ans.add();
        ArrayList<Integer>ans=new ArrayList<>();
        boolean []vis=new boolean[n];
        solve(arr,0,ans,final_ans,vis);
        return final_ans;
    }

    public void solve(int[]arr,int idx,ArrayList<Integer>ans,List<List<Integer>>final_ans,boolean[]vis){
        int n=arr.length;
        
        ArrayList<Integer>temp=new ArrayList<>();
        temp.addAll(ans);
        final_ans.add(temp);

       if(idx==n)
       return;

       for(int i=idx;i<n;i++){
           if(i==0 || (arr[i]!=arr[i-1]) || (vis[i-1])){
           ans.add(arr[i]);
           vis[i]=true;
           solve(arr,i+1,ans,final_ans,vis);
           vis[i]=false;
           ans.remove(ans.size()-1);
           }
       }

    }
}
